import { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Index() {
  const [percentage, setPercentage] = useState("");

  const handleInputChange = (text: string) => {
    if (!isNaN(Number(text)) || text === "") {
      setPercentage(text);
    }
  };

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
          width: "60%",
          fontSize:  RFPercentage(3),
          textAlign: "center",
        }}
      >
        Enter the probability of the event occuring
      </Text>
      <View
        style={{
          width: "20%",
          height: "5%",
        }}
      >
        <TextInput
          keyboardType="numeric"
          style={{
            marginTop: 10,
            width: "100%",
            height: "100%",
            borderWidth: 2,
            borderColor: "black",
            borderRadius: 5,
          }}
          value={percentage}
          onChangeText={handleInputChange}
        />
        <Text
          style={{
            fontSize: RFPercentage(2),
          }}
        >
          %
        </Text>
      </View>
    </View>
  );
}
