import {BaseToast, ErrorToast} from "react-native-toast-message";
import {theme} from "@/GlobalStyle";

export const NOTIF_CHANNEL_ID = "Pont tournant";
export const TIDES_URL = "https://www.horaire-maree.fr/maree/CHERBOURG/";
export const DATABASE_NAME = "ExpoSQLiteStorage";
// Formats for internal Sqlite use
export const TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:00";
export const SQLITE_DATE_FORMAT = "MM/DD/YYYY";

export const toastConfig = {
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: theme.titre,
        backgroundColor: theme.sec
      }}
      text1Style={{
        fontSize: 18,
        color: theme.bg,
      }}
      text2Style={{
        fontSize: 16,
        color: theme.bg,
      }}
    />
  ),
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: theme.success,
        backgroundColor: theme.sec
      }}
      text1Style={{
        fontSize: 18,
        color: theme.bg,
      }}
      text2Style={{
        fontSize: 16,
        color: theme.bg,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: theme.danger,
        backgroundColor: theme.sec
      }}
      text1Style={{
        fontSize: 18,
        color: theme.bg,
      }}
      text2Style={{
        fontSize: 16,
        color: theme.bg,
      }}
    />
  ),
};
