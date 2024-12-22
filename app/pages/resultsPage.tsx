import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

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
    <View>
      <Text>
          Your odds are 1 in {odds}
        </Text>
      {!isInt && (
        <Text>
          or {numerator} in {denominator}
        </Text>
      )}
    </View>
  )
}