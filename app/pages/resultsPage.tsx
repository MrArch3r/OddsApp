import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const oddsMessages = {
  1: "randomly hitting the inner bullseye on a dart board",
  2: "randomly selecting someone with green eyes",
  3: "hitting a specific number in roulette",
  4: "getting a critical hit in Pokemon",
  5: "randomly selecting someone with hazel eyes",
  8: "drawing an ace from a standard deck of cards",
  9: "randomly selecting the letter T from an english text",
  10: "being left-handed",
  13: "randomly selecting the letter E from an english text",
  17: "rolling a 6 on a fair dice",
  33: "winning a game of Rock-Paper-Scissors",
  50: "flipping a coin and it landing on heads",
  75: "scoring a goal from a penalty kick",
  79: "randomly selecting someone with brown eyes",
  92: "rolling more than a 3 from a pair of dice",
  97: "getting at least 1 head in 5 coin flips",
  98: "picking someone randomly with an IQ below 130",
  99: "2 people having the same birthday in a room of 60 people",
}

export default function ResultsPage() {
  const { percentage } = useLocalSearchParams();
  const p: number = parseFloat(Number(percentage).toFixed(2));
  const odds: number = parseFloat((100 / p).toFixed(2));
  let isInt: boolean = false;

  const reduceFraction = (numerator: number, denominator: number): [number, number] => {
    const gcd = (a: number, b: number): number => {
      while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
      }
      return a;
    };
  
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
  }

  let numerator: number = 0;
  let denominator: number = 0;

  if (Number.isInteger(odds)) {
    isInt = true;
  } else {
    const [numer, denom] = reduceFraction(p * 100, 10000);
    numerator = numer;
    denominator = denom;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}  
    >
      <Text
        style={{
          fontSize:  RFPercentage(4),
          textAlign: "center",
        }}
      >
        Your odds are 1 in {odds}
      </Text>
      {!isInt && (
        <Text
          style={{
            fontSize:  RFPercentage(4),
            textAlign: "center",
          }}  
        >
          or {numerator} in {denominator}
        </Text>
      )}
    </View>
  )
}