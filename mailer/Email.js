var nodemailer = require("nodemailer");
var SMTP_CONFIG = require("./smtp");

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: true,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
class Email {
  async sendHtml(req, res) {
    try {

      const mailSent = await transporter.sendMail({
        html: `
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <table cellpadding="0" cellspacing="0" border="0" align="center" width="700" style="border: 2px solid #e5e5e5" bgcolor="#ffffff">
            <tbody>
            <tr>
                <td valign="top" height="70" colspan="3">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tbody>
                        <tr>
                            <td style="color: transparent;" width="5">
                            </td>
                            <td valign="middle" align="{{if eq .Entidade ""}}middle{{else}}left{{end}}" >
                                <img  src=" https://smvc.dasorte.com//app/img/email/rp.png" width="220px">
                            </td>
                            <td style="color: transparent;" width="125px">
                            </td>
                            {{if ne .Entidade ""}}
                            <td valign="middle" align="right" width="125px">
                                <img   style="width:100%;" src="https://smvc.dasorte.com//app/img/email/apae.jpg">
                            </td>
                            {{end}}
                            <td style="color: transparent;" width="10">
                            </td>
                            {{if ne .Auditoria ""}}
                                <td valign="middle" align="right" width="125px" >
                                    <img   style="width:100%;"  src="https://smvc.dasorte.com//app/img/email/aplicap.png">
                                </td>
                            {{end}}
                            <td style="color: transparent;" width="5">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td valign="top" bgcolor="#cdcdcd" width="599" height="1" colspan="3"></td>
            </tr>
            <tr>
                <td colspan="3"  style="text-align:center;">
                  <span style="display:block; color:transparent;width:100%; height:10px;" ></span><br>
                    <center style="font-size:30px;font-weight:bold; font-family:sans-serif; color: #26519b;">{{.Saudacao}}</center>
                </td>
            </tr>
            <tr>
                <td width="270" valign="top" colspan="3" style= "padding:10px; font-family:sans-serif">
                    <font color="#4f4f4f" face="arial" size="5" >
                        <center>
                            <p>Seu token de acesso:</p>
                        </center>
                    </font>            
                        <center>
                            <div style="
                                background:#26519b; 
                                border-radius:6px; color:#fff;
                                margin-top:10px; 
                                font-size:30px;
                                width: 180px;
                                line-height:1.1;
                                text-align:center;
                                text-decoration:none;
                                display:block; 
                                "
                                >
                                <span style="display:block; color:transparent;width:100%; height:15px;" ></span>
                                <span style="letter-spacing:2px">{{.TokenCustomer}}</span> 
                                <span style="display:block; color:transparent;width:100%; height:15px;"  ></span>
                            </div>
                    <br><br>
                    <span style="font-size:16px;color: #5778b1;line-height: 1.5;"><b >Obrigado!</b><br>Equipe {{.Nome_base}}</span>
                </center>
                </td>
            </tr>


            <tr>
                <td valign="top" width="599" colspan="3"></td>
            </tr>
            <tr style="font-family:sans-serif;" >
                <td valign="top" align="center" style="padding: 20px;">
                    <center style="margin-bottom: 5px;">
                        <img src="https://smvc.dasorte.com//app/img/email/carta.jpg" alt="Contato por e-mail" style="vertical-align:middle">
                        <font face="arial" size="2" color="#4f4f4f"><span><strong><a style="color:#5778b1" href="mailto:{{.Email_base}}" target="_blank">{{.Email_base}}</a></strong></span></font>
                    </center>
                    <center style="margin-bottom: 5px;">
                        <img src="" style="width: 30px; height: 30px;vertical-align: middle;">
                        <font face="arial" size="2" color="#4f4f4f"><span><strong><a style="color:#5778b1" href="https://{{.Site}}" target="_blank">{{.Site}}</a></strong></span></font>
                    </center>
                    <center>
                        <img src="https://smvc.dasorte.com//app/img/email/telefone.jpg" alt="Contato por telefone" style="vertical-align:middle">
                        <font face="arial" size="2" color="#4f4f4f"><span><strong><a  style="color:#5778b1" href="tel:{{.Telefone_base}}" target="_blank">{{.Telefone_base}}</a></strong></span></font>
                    </center>
                </td>
            </tr>
            <tr>
                <td colspan="3" valign="top" bgcolor="#f4f4f4" width="599" height="3"></td>
            </tr>
            <tr>
                <td width="270" valign="top" colspan="3" style="padding:10px; text-align:center;">
                    <font color="#4f4f4f" face="arial" size="1">
                        <span style='font-size:10px'>{{.Rodape}}</span>
                    </font>
                </td>
            </tr>
            </tbody>
        </table>
        <center>
            <font color="#4f4f4f" face="arial" size="1">
                <br>
                {{.Extra}}
            </font>
        </center>
                        
            
            `,
        subject: "Teste de html",
        from: "Antonio Sena <0hertz1998@gmail.com>",
        to: ["0hertz1998@gmail.com","testepk1998@outlook.com"],
      });
      console.log(mailSent);
    } catch (err) {
      console.log(err);
    }

    res.status(202);
    res.send("Enviado com sucesso!");
  }
}

module.exports = new Email();
