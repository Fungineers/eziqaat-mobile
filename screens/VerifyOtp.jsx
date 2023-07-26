import { Button } from "react-native-paper";
import Note from "../components/Note";
import StringInput from "../components/StringInput";
import useRequestOtp from "../hooks/useRequestOtp";

const VerifyOtp = ({ settings }) => {
  const requestOtp = useRequestOtp();

  return (
    <>
      <Button
        icon="form-textbox-password"
        mode="contained-tonal"
        disabled={requestOtp.loading || requestOtp.timer > 0}
        loading={requestOtp.loading}
        onPress={requestOtp.call}
      >
        {requestOtp.timer > 0
          ? `Request OTP in ${requestOtp.timer} seconds`
          : "Request New OTP"}
      </Button>
      <Note text="Please use the OTP (One time password) we sent on your email address. You can request another OTP if you've lost, or didn'r recieve an OTP." />
      <StringInput
        icon="form-textbox-password"
        label="OTP"
        placeholder="e.g. 4167"
        value={settings.verifyOtpForm.values.otp}
        error={settings.verifyOtpForm.errors.otp}
        onChangeText={settings.verifyOtpForm.handleChange("otp")}
      />
      <Button
        icon="check"
        mode="contained"
        onPress={settings.verifyOtpForm.handleSubmit}
        loading={settings.loading}
        disabled={settings.loading}
      >
        Verify
      </Button>
    </>
  );
};

export default VerifyOtp;
