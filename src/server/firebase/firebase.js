import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "react-study-dab8a",
  private_key_id: "d5a1763531c231040b644ba1abda058b3f048596",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5i9jvCBQFBp7s\nieKiFg9ewHyqEgJKM/z44QQer8ecGJWlya8MdyrGdw7f+9VxtNYI9TjWtERze6qe\nt4r8v78EU6qWOW0Qi/fATq8yr+B1IluCZwmwnsXOM0HIkyQeVD03MWID5CXCLWAa\n+/2OXqAGK/eo3+/sU4nHRLl5zmxJ4A3IoNiOn+BFiWpPK4lyXF18Tc+vVeoy1V6X\nAZaYXbvkk7zZ4SnTjeU97MNhzWGJbULZA+mdsfcsMJrXkY9gzrnyBaikapZl3nY9\nLP0xMXb3XQfaRWGOorb0FvURvn5bkAUoE6ajg37swLEgnZ/SZlupJGuiF4ppYkND\nJaEaVNvpAgMBAAECggEAEcYpw8wcTtbxhms3AJvoYQVDa+9JtN4CD71Obboc/wED\n5NvLHwCTYmupSx+OtNPD5RvIlBi0rfNcxtOCRu//VmTFZJqfrgQaeZuQAOUENXRT\nG8zPCtJK1JPoa1RdE2KycoUShJjoXQ+Hs04MXgUGg1DW6qB5FURzYFlfAyIZEYJx\nSlt9YFZ8I3rXfCVSVu1oytYoPYlO1dfqbeqQEcRy010QXoD5jCvKnu3SyWY4sLQh\nMq43P+Z/KuxoWb0AR1ZsnQiVTzccHVQat783UsLC6/A5X7MP38d2hUxjfO5gbaRY\ntwetnl6fzDRJaWNNXo0ZxE3bgi9LYtyLkCZG7eXW+QKBgQDfxdE+D/YQrXL6+HKT\nFjYPnF+ECnADtVNHBgqwVFlbgRsAXT//oZh2y/VP/7uUBq0soI+c6Cq0TwQr6nkx\n8E43JUl+coRm70Fc/DlOzPdBsGxe8q9kmMvFcfjndoOSl7+MFGQPk9E/9mz1ei4m\nB+lWOZojnd1tFj8Av7hFCfv4nwKBgQDURKzfQJsclUZZhf3GUGp+zCfpI31AJ0Y4\nRspz6aIpGiiUN2qaSTqOtiDPfW5INnacLodOAlz46uReXVc+MLKWZRyhRdzqXmIN\nG68htfERCc8WWqRHDyYKBnGIdJQq+A8shcPKB/BNXRUdXajb/R1YPOj5UIeHA2FO\nOpr8eYV2dwKBgBmT3+XrJyIi4Uiki1waptVD93r9Qm56FGnC3AfprEkUScTR49XR\nX778cy7QuV0jIjo+pAu4UeFIQt7OL0oxAI+3GF52soGdiWgagGZscTq18r0rmjay\nbGBGNcAnQMTJyaA2WHWbXMil3zBz5cB9GQO9E8xMaBnm+A6a23IwwPdbAoGBAKRZ\nP9fjN7WbxkpOOjyvyqS+ATC7b6CaR/4OoXW5sPpN7JlFht5KUHJqhWDhZt+2e4NV\nayF1JvL7OzHs5z2ZisxzIQWlB/TWeuhXRPO+4RUmGRbfu03hZrxgXMsgKBBU27rH\nHt5v4xijN1PzTmh1w6CsGF3gge6BKXfeXF2a4UDlAoGAKaRiOPn+j8ShLKWnqVAl\n9cZvooqwZ4pi5N2VuspzFQDsMRXXzFJXxKhKMml/A0IowwBHN+UFqqgcAgTITd8M\nTH+w25hVgtkHtbhmlo/mExLBV+rqKTJDzMmEbKzXweHuh9V/ThxR7vmjkc6IYY2v\nn/mPOywbNl4cc8d7+cyy/h4=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-bze4e@react-study-dab8a.iam.gserviceaccount.com",
  client_id: "113977026071896141699",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bze4e%40react-study-dab8a.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

let app;

const getApp = () => {
  if (!app) {
    try {
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("Firebase Initialized.");
    } catch (error) {
      /*
       * We skip the "already exists" message which is
       * not an actual error when we're hot-reloading.
       */
      if (!/already exists/u.test(error.message)) {
        console.error("Firebase admin initialization error", error.stack);
      }
    }
  }
  return app;
};

export const validateRequest = async (req) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = await getApp().auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
