<%@ WebHandler Language="C#" Class="ClassroomHandler" %>

using System;
using System.Web;
using System.Text;
using System.Data;
using System.Data.SqlClient;

public class ClassroomHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //string m_date = "2014-8-19";
        StringBuilder sb = new StringBuilder();
        sb.AppendFormat("select * from renzhi");
        string sql = sb.ToString();
        DataSet ds = SQLHelper.ExecuteTable(sql, "dbo");
        DataTable dt=new DataTable();
        dt=ds.Tables[0];
        string strJson=DataTableToJson("rows",dt);
        context.Response.Write(strJson);  
        context.Response.End();
    }
    
    //将datatable数据转换成JSON数据  
    public string DataTableToJson(string jsonName, DataTable dt)  
    {  
  
        StringBuilder Json = new StringBuilder();  
        Json.Append("[");  
        if (dt.Rows.Count > 0)  
        {  
            for (int i = 0; i < dt.Rows.Count; i++)  
            {  
                Json.Append("{");  
                for (int j = 0; j < dt.Columns.Count; j++)  
                {  
                    Json.Append(dt.Columns[j].ColumnName.ToString() + ":\"" + dt.Rows[i][j].ToString() + "\"");  
                    if (j < dt.Columns.Count - 1)  
                    {  
                        Json.Append(",");  
                    }  
                }  
                Json.Append("}");  
                if (i < dt.Rows.Count - 1)  
                {  
                    Json.Append(",");  
                }  
            }  
        }  
        Json.Append("]");  
        return Json.ToString();  
    } 
 
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}