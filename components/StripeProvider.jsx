import * as Linking from "expo-linking";
import { StripeProvider } from "@stripe/stripe-react-native";
import Constants from "expo-constants";

const merchantId = Constants.expoConfig?.plugins?.find(
  (p) => p[0] === "@stripe/stripe-react-native"
)?.[1].merchantIdentifier;

if (!merchantId) {
  throw new Error('Missing Expo config for "@stripe/stripe-react-native"');
}
const stripeKey = Constants.expoConfig.extra.STRIPE_PUBLIC_KEY;

export default function ExpoStripeProvider({children}) {
  return (
    <StripeProvider
      publishableKey={stripeKey ?? ""}
      //merchantIdentifier={merchantId}
      urlScheme={Linking.createURL("/").split(":")[0]}
    >
      {children}
    </StripeProvider>
  );
}
