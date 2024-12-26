import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useRouter } from "expo-router";

export default function Home({}) {
  const [percentage, setPercentage] = useState("");
  const router = useRouter();

  const handleInputChange = (text: string) => {
    const trimmedText: string = text.trim();
    const num: number = Number(trimmedText);

    const isValidFormat = /^\d{0,3}\.?\d{0,4}$/.test(trimmedText);

    if (
      !trimmedText.includes(" ") && 
      (!isNaN(num) || trimmedText === "") &&
      isValidFormat
    ) {
      if (num >= 0 && num <= 100) {
        setPercentage(trimmedText);
      }
    }
  };

  const showResult = () => {
    const num: number = Number(percentage);
    if (num !== 0 && !isNaN(num)) {
      router.push(`/pages/resultsPage?percentage=${percentage}`);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8"
      }}
    >
      <Text
        style={{
          width: "75%",
          fontSize:  RFPercentage(5),
          textAlign: "center",
        }}
      >
        Enter
      </Text>
      <Text
        style={{
          width: "90%",
          fontSize:  RFPercentage(5),
          textAlign: "center",
        }}
      >
        Your Probability
      </Text>
      <View
        style={{
          width: RFPercentage(20),
          height: RFPercentage(10),
        }}
      >
        <TextInput
          keyboardType="numeric"
          style={{
            marginTop: RFPercentage(3),
            width: "100%",
            height: "100%",
            borderWidth: 2,
            borderColor: "#dddddd",
            borderRadius: RFPercentage(2),
            fontSize: RFPercentage(3),
            paddingLeft: RFPercentage(1.5),
            color: "#404040",
            backgroundColor: "white",
          }}
          value={percentage}
          onChangeText={handleInputChange}
        />
        <Text
          style={{
            position: "absolute",
            right: RFPercentage(1.5),
            top: RFPercentage(4.5),
            fontSize: RFPercentage(3),
            color: "#404040"
          }}
        >
          %
        </Text>
      </View>
      <View
        style={{
          marginTop: RFPercentage(3),
          width: RFPercentage(16),
          height: RFPercentage(6),
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#4b64db",
            borderRadius: RFPercentage(2),
            width: "100%",
            height: "100%",
          }}
          onPress={showResult}
        >
          <Text 
            style={{ 
              fontSize: RFPercentage(2.5),
              color: "white", 
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Get Odds
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}