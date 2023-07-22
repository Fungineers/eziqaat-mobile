import React from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const TermsAndConditions = ({ hide }) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "column", gap: 10 }}>
      <Text
        variant="bodyMedium"
        style={{
          color: theme.colors.primary,
          marginHorizontal: 10,
        }}
      >
        Welcome to our mobile app! These terms and conditions outline the rules
        and regulations for the use of our app.
      </Text>
      <View
        style={{
          flexDirection: "column",
          gap: 10,
          padding: 10,
          backgroundColor: theme.colors.inverseOnSurface,
          borderRadius: 5,
        }}
      >
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          By downloading and using our app, you accept these terms and
          conditions in full. If you disagree with any part of these terms and
          conditions, you must not use our app.
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: 700 }}>
          1. License to Use the App:
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          We grant you a non-exclusive, non-transferable license to use our app
          for personal, non-commercial purposes only. You must not copy, modify,
          distribute, sell, or lease any part of our app.
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: 700 }}>
          2. User Accounts:
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          To access certain features of our app, you may need to create a user
          account. You are responsible for maintaining the confidentiality of
          your account and password and for restricting access to your device.
          You agree to accept responsibility for all activities that occur under
          your account.
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: 700 }}>
          3. Privacy Policy:
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          Your privacy is important to us. Please review our Privacy Policy,
          which explains how we collect, use, and disclose information about
          you.
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: 700 }}>
          4. Content Ownership:
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          All content in our app, including text, images, videos, and other
          media, is our property or the property of our licensors. You may not
          use, reproduce, or distribute any content from our app without our
          prior written consent.
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: 700 }}>
          5. Prohibited Activities:
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          When using our app, you agree not to engage in any of the following
          prohibited activities:
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.secondary, fontStyle: "italic" }}
        >
          a. Violating any applicable laws or regulations.
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.secondary, fontStyle: "italic" }}
        >
          b. Interfering with or disrupting the app's functionality or servers.
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.secondary, fontStyle: "italic" }}
        >
          c. Attempting to gain unauthorized access to our app or its related
          systems.
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.secondary, fontStyle: "italic" }}
        >
          d. Uploading or sharing content that is offensive, harmful, or
          violates the rights of others.
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.secondary, fontStyle: "italic" }}
        >
          e. Impersonating any person or entity, or falsely representing your
          affiliation with any person or entity.
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.secondary, fontStyle: "italic" }}
        >
          f. Using our app for any commercial or promotional purposes without
          our consent.
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: 700 }}>
          6. Third-Party Links:
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          Our app may contain links to third-party websites or services that are
          not owned or controlled by us. We are not responsible for the content
          or privacy practices of these third-party sites. Your use of such
          third-party websites is at your own risk.
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: 700 }}>
          7. Limitation of Liability:
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          We strive to provide accurate and up-to-date information in our app,
          but we make no representations or warranties of any kind, express or
          implied, about the completeness, accuracy, reliability, suitability,
          or availability with respect to the app or the information, products,
          services, or related graphics contained in the app. Your use of our
          app is at your own risk.
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: 700 }}>
          8. Indemnification:
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          You agree to indemnify and hold us harmless from any claims, losses,
          damages, liabilities, and expenses, including attorney's fees, arising
          out of your use of our app or any violation of these terms and
          conditions.
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: 700 }}>
          9. Changes to the Terms and Conditions:
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          We may revise these terms and conditions at any time without notice.
          By continuing to use our app after any changes, you agree to be bound
          by the revised terms and conditions.
        </Text>
        <Text variant="bodyMedium" style={{ fontWeight: 700 }}>
          10. Governing Law:
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          These terms and conditions are governed by and construed in accordance
          with the laws of the Islamic Republic of Pakistan, and you agree to
          submit to the exclusive jurisdiction of the courts in the Islamic
          Republic of Pakistan.
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          By using our app, you acknowledge that you have read, understood, and
          agreed to these terms and conditions. If you do not agree to these
          terms and conditions, please refrain from using our app. Thank you for
          using our mobile app!
        </Text>
      </View>
      <Button mode="contained" onPress={hide} icon="check-all">
        Done
      </Button>
    </View>
  );
};

export default TermsAndConditions;
