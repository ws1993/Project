<%@ WebHandler Language="C#" Class="FeedbackHandler" %>

using System;
using System.Web;
using System.Text;
using System.Data;
using System.Data.SqlClient;

public class FeedbackHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string m_fcnt = context.Request.Params["Fcontent"].ToString().Trim();
        string m_email = context.Request.Params["email"].ToString().Trim();
        string m_phone = context.Request.Params["phone"].ToString().Trim();
        bool personInfo=m_email!="" && m_phone!="";
        if (m_fcnt != "" && personInfo)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendFormat("insert into feedback values('{0}','{1}','{2}')", m_fcnt, m_email, m_phone);
            string sql = sb.ToString();
            SQLHelper.ExecuteNonQuery(sql, "dbo");
        }
        else
        {
            
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}