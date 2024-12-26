import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useRouter } from "expo-router";

const oddsMessages: Record<number, string> = {
  1: "randomly hitting the inner bullseye on a dart board",
  2: "randomly selecting someone with green eyes",
  3: "hitting a specific number in roulette",
  4: "getting a critical hit in Pokemon",
  5: "randomly selecting someone with hazel eyes",
  6: "getting all heads or all tails when flipping 5 coins",
  8: "drawing an ace from a standard deck of cards",
  9: "randomly selecting the letter T from an english text",
  10: "being left-handed",
  13: "randomly selecting the letter E from an english text",
  15: "drawing either an ace or 2 from a standard deck",
  17: "rolling a 6 on a fair dice",
  20: "",
  23: "drawing a picture card from a standard deck",
  24: "missing a penalty kick",
  25: "flipping 2 coins and getting 2 heads",
  27: "being dealt a 21, 20, 19 or 18 from the first two cards in Blackjack",
  31: "selecting either an Ace, King, Queen or Jack from a standard deck of cards",
  33: "winning a game of Rock-Paper-Scissors",
  42: "getting a pair in 5-card poker",
  50: "flipping a coin and it landing on heads",
  67: "not winning a game of Rock-Paper-Scissors",
  75: "flipping 2 coins and getting at least 1 head",
  76: "scoring a goal from a penalty kick",
  79: "randomly selecting someone with brown eyes",
  83: "not rolling a 6 on a fair dice",
  92: "rolling more than a 3 from a pair of dice",
  97: "getting at least 1 head in 5 coin flips",
  98: "picking someone randomly with an IQ below 130",
  99: "2 people having the same birthday in a room of 60 people",
}

export default function ResultsPage() {
  const { percentage } = useLocalSearchParams();
  const router = useRouter();

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

  const handleBack = () => {
    router.push("/pages/home");
  }

  return (
    <>
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
              width: "80%",
              fontSize:  RFPercentage(4),
              textAlign: "center",
            }}  
          >
            or {numerator} in {denominator}
          </Text>
        )}

        {Math.round(p) in oddsMessages && (
          <Text
            style={{
              marginTop: RFPercentage(5),
              width: "80%",
              fontSize:  RFPercentage(3),
              textAlign: "center",
            }}  
          >
            This is about as often as {oddsMessages[Math.round(p)]}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          marginLeft: RFPercentage(2),
          marginTop: RFPercentage(2),
        }}
        onPress={handleBack}
      >
        <Image 
          source={require("../images/arrow-back.svg")}
          style={{
            width: RFPercentage(7),
            height: RFPercentage(7),
          }}
        />
      </TouchableOpacity>
    </>
  )
}