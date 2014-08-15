using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Collections;

/// <summary>
///SQLHelper 的摘要说明
///创建人：
///参数
///意义
/// </summary>
public class SQLHelper
{
    public SQLHelper()
    {
        //
        //TODO: 在此处添加构造函数逻辑
        //
    }

    public static string GetAppConfig(string strKey)
    {
        foreach (string key in ConfigurationManager.AppSettings)
        {
            if (key == strKey)
            {
                return ConfigurationManager.AppSettings[strKey];
            }
        }
        return null;
    }


    //  <configuration>
    //<connectionStrings>
    //  <add name="sde" connectionString="Data Source=WS-PC;Initial Catalog=sde;User ID=sa;Password=sa"/>
    //  <add name="dbo" connectionString="Data Source=WS-PC;Initial Catalog=PGALDB;User ID=sa;Password=sa"/>
    //</connectionStrings>

    public static SqlConnection sqlcon(string sqlConnectionString)
    {
        SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings[sqlConnectionString].ConnectionString);
        if (Con.State != ConnectionState.Open)
        {
            Con.Open();
        }
        return Con;
    }


    public int ExecuteScalar(string sql, string sqlConnectionString)
    {
        try
        {
            SqlCommand cmd = new SqlCommand(sql, sqlcon(sqlConnectionString));  //创建SqlCommand对象实例
            int val = (int)cmd.ExecuteScalar();  //执行SQL并返回受影响的行数
            return val;                       //返回受影响的行数
        }
        catch { sqlcon(sqlConnectionString).Close(); throw; }
        finally
        {
            sqlcon(sqlConnectionString).Dispose();
            sqlcon(sqlConnectionString).Close();
        }
    }


    public static int ExecuteNonQuery(string sql, string sqlConnectionString)
    {
        try
        {
            SqlCommand cmd = new SqlCommand(sql, sqlcon(sqlConnectionString));  //创建SqlCommand对象实例
            int val = cmd.ExecuteNonQuery();  //执行SQL并返回受影响的行数
            return val;                       //返回受影响的行数
        }
        catch { sqlcon(sqlConnectionString).Close(); throw; }
        finally
        {
            sqlcon(sqlConnectionString).Dispose();
            sqlcon(sqlConnectionString).Close();
        }
    }

    public static SqlDataReader ExecuteReader(string sql, string sqlConnectionString)
    {
        SqlCommand cmd = new SqlCommand(sql, sqlcon(sqlConnectionString));
        try
        {
            SqlDataReader rdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            cmd.Parameters.Clear();   //清除参数列表
            return rdr;               //返回SqlDataReader对象
        }
        catch
        {
            sqlcon(sqlConnectionString).Close();           //在出现异常时即时关闭连接
            throw;                    //重新抛出异常
        }
        finally
        {
            sqlcon(sqlConnectionString).Dispose();
            sqlcon(sqlConnectionString).Close();
        }
    }

    public static DataSet ExecuteTable(string sql, string sqlConnectionString)
    {
        SqlCommand cmd = new SqlCommand(sql, sqlcon(sqlConnectionString));//实例化SqlCommand对象

        try
        {
            //构建SqlCommand对象的相关属性
            SqlDataAdapter dp = new SqlDataAdapter(cmd);
            DataSet ds = new DataSet();
            dp.Fill(ds);  //执行SQL语句并填充DataSet
            return ds;
        }
        catch
        {
            sqlcon(sqlConnectionString).Close();  //在出现异常时关闭连接
            throw;         //抛出异常
        }
        finally
        {
            sqlcon(sqlConnectionString).Dispose();
            sqlcon(sqlConnectionString).Close();//无论是否出现异常，在离开时都要关闭连接   

        }
    }
    /// 
    /// 执行存储过程
    /// 
    /// 存储过程名
    /// 存储过程参数
    /// DataSet结果中的表名
    /// DataSet
    public static DataSet RunProcedure(string storedProcName, IDataParameter[] parameters, string tableName, string sqlConnectionString)
    {
        using (SqlConnection connection = new SqlConnection(sqlConnectionString))
        {
            DataSet dataSet = new DataSet();
            connection.Open();
            SqlDataAdapter sqlDA = new SqlDataAdapter();
            sqlDA.SelectCommand = BuildQueryCommand(connection, storedProcName, parameters);
            sqlDA.Fill(dataSet, tableName);
            connection.Close();
            return dataSet;
        }
    }

    /// 
    /// 构建 SqlCommand 对象(用来返回一个结果集，而不是一个整数值)
    /// 
    /// 数据库连接
    /// 存储过程名
    /// 存储过程参数
    /// SqlCommand
    private static SqlCommand BuildQueryCommand(SqlConnection connection, string storedProcName, IDataParameter[] parameters)
    {
        SqlCommand command = new SqlCommand(storedProcName, connection);
        command.CommandType = CommandType.StoredProcedure;
        foreach (SqlParameter parameter in parameters)
        {
            if (parameter != null)
            {
                // 检查未分配值的输出参数,将其分配以DBNull.Value.
                if ((parameter.Direction == ParameterDirection.InputOutput || parameter.Direction == ParameterDirection.Input) &&
                    (parameter.Value == null))
                {
                    parameter.Value = DBNull.Value;
                }
                command.Parameters.Add(parameter);
            }
        }

        return command;
    }

    /// 
    /// 执行一条计算查询结果语句，返回查询结果（object）。
    /// 
    /// 计算查询结果语句
    /// 查询结果（object）
    public static object GetSingle(string SQLString, string sqlConnectionString)
    {
        using (SqlConnection connection = new SqlConnection(sqlConnectionString))
        {
            using (SqlCommand cmd = new SqlCommand(SQLString, connection))
            {
                try
                {
                    connection.Open();
                    object obj = cmd.ExecuteScalar();
                    if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
                    {
                        return null;
                    }
                    else
                    {
                        return obj;
                    }
                }
                catch (System.Data.SqlClient.SqlException e)
                {
                    connection.Close();
                    throw e;
                }
            }
        }
    }

}