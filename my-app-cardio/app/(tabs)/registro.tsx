import { useRouter } from 'expo-router';
import * as React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const NuevoRegistro = () => {
  const [actividad, setActividad] = React.useState("");
  const [sintomas, setSintomas] = React.useState("");
  const [hora_aprox, setHora_aprox] = React.useState("");
  const [datos, setDatos] = React.useState("");

  useFocusEffect(
    useCallback(() => {
      const now = new Date();
      const hora = now.toLocaleTimeString();
      setHora_aprox(hora);
    }, [])
  );

  const router = useRouter();

  const registrar_evento = async () => {
    console.log("Actividad:", actividad);
    console.log("Sintomas:", sintomas);
    console.log("Hora aproximada:", hora_aprox);
    console.log("Datos:", datos);

    try {
      const response = await fetch("http://10.41.150.70:8000/evento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actividad,
          sintomas,
          hora_aprox,
          datos,
        }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.status === "ok") {
        alert("Evento registrado con éxito!");
        router.push('/(tabs)/menu'); // Redirige a menu
        
        //Limpiar los campos después del registro
        setActividad("");
        setSintomas("");
        setHora_aprox("");
        setDatos("");

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Error al conectarse al servidor:", error);
      alert("No se pudo conectar al servidor");
    }
  };
    
  return (
    <SafeAreaView style={styles.viewBg}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={[styles.view, styles.viewBg]}>
                <View style={styles.child} />
                
                {/* Título */}
                <Text style={[styles.registroDeEvento, styles.registroDeEventoFlexBox]}>
                Registro de evento
                </Text>

                {/* Imagen arriba */}
                <Image
                source={require("@/assets/images/image_3.png")}
                style={styles.image3Icon}
                resizeMode="cover"
                />

                {/* Sección descripción */}
                <View style={styles.component2}>
                <View style={[styles.component2Child, styles.component2Position]} />
                <Text style={[styles.eventosReportados, styles.tabFlexBox]}>
                    Descripción del evento
                </Text>
                <View style={[styles.component2Item, styles.component2Position]} />
                </View>

                {/* Imagen en el medio */}
                <Image
                source={require("@/assets/images/game-icons_archive-register.png")}
                style={styles.gameIconsarchiveRegister}
                resizeMode="contain"
                />

                <Text style={[styles.lleneElFormulario, styles.lleneElFormularioTypo]}>
                Llene el formulario con las preguntas pertinentes y archiva la información mediante el boton
                </Text>

                {/* Pregunta 1 */}
                <View style={[styles.input, styles.inputPosition]}>
                <Text style={[styles.queSintomasPadecio, styles.queSintomasPadecioClr]}>
                  ¿Qué síntomas padeció (Ej. dolor de tórax, mareos, náuseas)?
                </Text>

                <View style={[styles.textField, styles.textFieldFlexBox]}>
                  <TextInput style={[styles.ingreseSuRespuesta, styles.queSintomasPadecioClr]} value={sintomas}
                  onChangeText={setSintomas}
                  autoCapitalize="none"/>
                </View>
                </View>

                {/* Pregunta 2 */}
                <View style={[styles.nuevoRegistroInput, styles.inputPosition]}>
                <Text style={[styles.queSintomasPadecio, styles.queSintomasPadecioClr]}>
                    Datos adicionales que considere pertinentes:
                </Text>
                
                <View style={[styles.textField, styles.textFieldFlexBox]}>
                    <TextInput style={[styles.ingreseSuRespuesta, styles.queSintomasPadecioClr]} value={datos}
                    onChangeText={setDatos}
                    autoCapitalize="none"/>
                </View>
                </View>

                {/* Pregunta 3 */}
                <View style={[styles.input2, styles.textFieldhour]}>
                <Text style={[styles.queSintomasPadecio, styles.queSintomasPadecioClr]}>
                  Evento: {hora_aprox || "Sin hora"}
                </Text>

                </View>

                {/* Pregunta 4 */}
                <View style={[styles.input3, styles.inputPosition]}>
                <Text style={[styles.queSintomasPadecio, styles.queSintomasPadecioClr]}>
                    ¿Qué actividad estuvo realizando previamente?
                </Text>
                <View style={[styles.textField, styles.textFieldFlexBox]}>
                  <TextInput style={[styles.ingreseSuRespuesta, styles.queSintomasPadecioClr]} value={actividad}
                  onChangeText={setActividad}
                  autoCapitalize="none"/>
                </View>
                </View>

                {/* Botón */}
                <Pressable style={[styles.primaryButton, styles.textFieldFlexBox]} onPress={registrar_evento}>
                <Text style={styles.archivarInformacin}>Archivar información</Text>
                </Pressable>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  // (los mismos estilos que ya tienes, no los cambié)
  viewBg: {
    backgroundColor: "#fff",
    flex: 1,
  },
  view: {
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
  registroDeEventoFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  tabFlexBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  component2Position: {
    borderTopWidth: 1.5,
    borderColor: "#929295",
    bottom: "48.03%",
    top: "48.03%",
    height: "3.95%",
    borderStyle: "solid",
    position: "absolute",
  },
  lleneElFormularioTypo: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },
  inputPosition: {
    gap: 8,
    position: "absolute",
    overflow: "hidden",
  },
  queSintomasPadecioClr: {
    color: "#000",
    textAlign: "left",
  },
  textFieldFlexBox: {
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  child: {
    top: -62,
    borderRadius: 40,
    borderWidth: 1,
    width: 395,
    height: 245,
    left: -2,
    backgroundColor: "#323249",
    position: "absolute",
  },
  registroDeEvento: {
    top: 123,
    left: 47,
    fontSize: 20,
    color: "#fff",
    fontFamily: "Inter-Medium",
    fontWeight: "500",
  },
  image3Icon: {
    top: 36,
    left: 279,
    width: 99,
    height: 99,
    position: "absolute",
  },
  tabs: {
    top: 744,
    backgroundColor: "#e9ebff",
    borderColor: "#b6b6ce",
    width: 397,
    height: 106,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    left: -2,
    position: "absolute",
    overflow: "hidden",
    paddingHorizontal: 32,
  },
  tab: {
    gap: 2,
    justifyContent: "center",
    overflow: "hidden",
  },
  ggprofileIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
    
  },
  atras: {
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#929295",
    fontSize: 12,
    textAlign: "center",
  },
  component2: { //Para mover todo el compoennte de descripcion del evento
    top: 195,
    left: 0,
    width: 394,
    height: 38,
    position: "absolute",
  },
  component2Child: {
    width: "55.2%",
    right: "-0.19%",
    left: "50%",
  },
  eventosReportados: {
    left: "10.41%",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: "#797979",
    textAlign: "center",
    position: "absolute",
    top: 6,
  },
  component2Item: {
    width: "8.5%",
    right: "91.69%",
    left: "-0.19%",
  },
  gameIconsarchiveRegister: {
    top: 23,
    left: 87,
    width: 100,
    height: 100,
    position: "absolute",
  },
  lleneElFormulario: {
    top: 236,
    color: "#323449",
    width: 283,
    height: 33,
    opacity: 0.6,
    textAlign: "left",
    left: 35,
    position: "absolute",
  },
  input: {
    top: 308,
    height: 91,
    width: 325,
    left: 34,
  },
  queSintomasPadecio: {
    fontSize: 14,
    alignSelf: "stretch",
    fontFamily: "Inter-Medium",
    fontWeight: "500",
  },
  textField: {
    borderColor: "rgba(0, 0, 0, 0.3)",
    paddingVertical: 1,
    alignSelf: "stretch",
    borderWidth: 2,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderStyle: "solid",
    backgroundColor: "#fff",
  },
  textFieldhour: {
    borderColor: "rgba(0, 0, 0, 0.3)",
    paddingVertical: 1,
    alignSelf: "stretch",
    borderWidth: 2,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderStyle: "solid",
    backgroundColor: "#fff",
  },
  ingreseSuRespuesta: {
    opacity: 0.5,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    flex: 1,
    width: "100%",
    height: 30,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    textAlign: "left",
  },
  nuevoRegistroInput: {
    top: 488,
    width: 326,
    left: 35,
  },
  input2: {
    top: 274,
    width: 325,
    left: 35,
  },
  input3: {
    top: 407,
    left: 32,
    width: 325,
  },
  primaryButton: {
    top: 595,
    height: 44,
    paddingVertical: 0,
    width: 325,
    left: 34,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#323249",
    position: "absolute",
  },
  archivarInformacin: {
    fontSize: 16,
    fontWeight: "300",
    fontFamily: "Inter-Light",
    textAlign: "left",
    color: "#fff",
  },
    scrollContainer: { 
    flexGrow: 1,
  },
});

export default NuevoRegistro;
