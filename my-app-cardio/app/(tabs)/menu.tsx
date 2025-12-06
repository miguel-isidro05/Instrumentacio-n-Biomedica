import { useFocusEffect, useRouter } from "expo-router";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Evento {
  actividad: string;
  sintomas: string;
  hora_aprox: string;
  datos: string;
}

// Componente de pantalla principal
const Principal = () => {
  const router = useRouter();
  const [eventos, setEventos] = React.useState<Evento[]>([]);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const cargarEventos = async () => {
    try {
      console.log("Cargando eventos desde el backend...");
      const response = await fetch("http://10.41.150.70:8000/eventos");
      const data = await response.json();
      console.log("Eventos recibidos:", data);

      // ✅ Verifica que la respuesta tenga estructura esperada
      if (data && data.eventos && Array.isArray(data.eventos)) {
        setEventos(data.eventos);
      } else {
        setEventos([]);
      }
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  // 🔁 Se ejecuta al montar el componente
  useEffect(() => {
    cargarEventos();
  }, []);

  // 🔁 También se ejecuta al volver a enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      cargarEventos();
    }, [])
  );

  // Función para manejar el registro de eventos
  const Registrar_evento = () => {
    console.log("Botón de eventos presionado");
    // Navegar a la pantalla de registro de eventos
    router.push('/(tabs)/registro'); // Redirige a registro de eventos
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 ); // Actualiza cada segundo

    return () => clearInterval(timer); // Limpia el intervalo al desmontar
  }
  , []);

  return (
    <SafeAreaView style={[styles.principal, styles.viewFlexBox]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={[styles.view, styles.viewFlexBox]}>
          <View style={[styles.child, styles.childBorder]} />
          <Text style={[styles.bienvenido, styles.usuarioTypo]}>Bienvenido</Text>
          <Text style={[styles.usuario, styles.usuarioTypo]}>Usuario</Text>

          {/* Imagen de perfil */}
          <Image
            style={styles.image3Icon}
            resizeMode="cover"
            source={require("@/assets/images/image_3.png")}
          />
        
        <Text style={[styles.estadoDelDispositivo, styles.eventosReportadosTypo]}>
          Estado del dispositivo
        </Text>
        
        <Text style={[styles.hora, styles.eventosReportadosTypo]}>
            {currentDate.toLocaleTimeString()}
        </Text>

          {/* Estado general */}
          <View style={[styles.dashboardCard, styles.dashboardCardLayout]}>
            <View style={[styles.default, styles.defaultSpaceBlock]}>
              <Text style={[styles.estadoGeneral, styles.textFlexBox]}>
                Estado general
              </Text>
            </View>
            <View style={[styles.content, styles.contentFlexBox]}>
              <Image
                style={styles.ggprofileLayout}
                resizeMode="contain"
                source={require("@/assets/images/hugeicons_connect.png")}
              />
              <Text style={[styles.conectado, styles.textTypo]}>Conectado</Text>
            </View>
          </View>

          {/* Batería */}
          <View style={[styles.principalDashboardCard, styles.dashboardCardLayout]}>
            <View style={[styles.principalDefault, styles.tabFlexBox1]}>
              <Text style={[styles.bateria, styles.textTypo]}>Batería</Text>
            </View>
            <View style={[styles.content, styles.contentFlexBox]}>
              <Image
                style={styles.ggprofileLayout}
                resizeMode="contain"
                source={require("@/assets/images/fluent_battery-charge-24-regular.png")}
              />
              <Text style={[styles.text, styles.textTypo]}>60%</Text>
            </View>
          </View>

          {/* Eventos */}
          <View style={styles.component2}>
            <View style={[styles.component2Child, styles.component2Position]} />
            <Text style={[styles.eventosReportados, styles.eventosReportadosTypo]}>
              Eventos reportados
            </Text>
            <View style={[styles.component2Item, styles.component2Position]} />
          </View>

          {eventos.length === 0 ? (
            <View style={[styles.default2, styles.defaultSpaceBlock]}>
              <Text style={[styles.evento1, styles.textFlexBox]}>
              </Text>
            </View>
          ) : (

            eventos.map((evento, index) => (
              <View key={index} style={[styles.eventoFila, styles.default2]}>
                <Text style={[styles.evento1, styles.textFlexBox]}>
                  Evento {index + 1}: ({evento.hora_aprox || "Sin hora"})
                </Text>
              </View>
            ))

          )}
          {/* Botón */}
          <Pressable style={styles.button} onPress={(Registrar_evento)}>
            <Text style={styles.buttonText}>Registrar evento</Text>
          </Pressable>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  /* 👇 aquí se mantiene exactamente lo que me pasaste 👇 */
  eventoFila: {
    width: "90%",
    padding: 12,
    top: 430,
    borderRadius: 12,     // bordes un poquito más suaves
    marginVertical: 12,   // separación entre un evento y otro
    marginHorizontal: 10, // separación hacia los costados
    alignSelf: "center",
    
  },
  principal: {
    backgroundColor: "#fff"
  },
  viewFlexBox: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scrollContainer: { 
    flexGrow: 1,
  },
  childBorder: {
    borderWidth: 1,
    borderStyle: "solid",
    position: "absolute"
  },
  usuarioTypo: {
    width: 256,
    textAlign: "left",
    color: "#fff",
    fontSize: 24,
    left: 32,
    position: "absolute"
  },
  tabFlexBox1: {
    alignItems: "center",
    overflow: "hidden"
  },
  tabFlexBox: {
    gap: 2,
    justifyContent: "center",
    flex: 1
  },
  salirTypo: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "600"
  },
  contentFlexBox: {
    alignSelf: "stretch",
    alignItems: "center",
    overflow: "hidden"
  },
  nuevoRegistroTypo: {
    color: "#000",
    textAlign: "center",
    fontSize: 12
  },
  dashboardCardLayout: {
    gap: 0,
    padding: 24,
    justifyContent: "space-between",
    height: 134,
    borderRadius: 8,
    elevation: 16,
    top: 220,
    width: 159,
    position: "absolute",
    overflow: "hidden"
  },
  defaultSpaceBlock: {
    paddingBottom: 6,
    paddingRight: 16,
    paddingTop: 6,
    paddingLeft: 13,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "#ffffffff"
  },
  textFlexBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textTypo: {
    fontFamily: "IstokWeb-Bold",
    color: "#000",
    textAlign: "center",
    fontWeight: "700"
  },
  component2Position: {
    borderTopWidth: 1.5,
    borderColor: "#929295",
    bottom: "48.03%",
    top: "30%",
    height: "3.95%",
    borderStyle: "solid",
    position: "absolute"
  },
  eventosReportadosTypo: {
    color: "#797979",
    lineHeight: 20,
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    position: "absolute"
  },
  ggprofileLayout: {
    height: 24,
    width: 24
  },
  view: {
    height: 848,
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#fff"
  },
  child: {
    top: -62,
    borderRadius: 40,
    backgroundColor: "#323249",
    width: 395,
    height: 226,
    left: -2
  },
  bienvenido: {
    top: 63,
    fontFamily: "Inter-Bold",
    fontWeight: "700"
  },
  usuario: {
    top: 92,
    fontWeight: "300",
    fontFamily: "Inter-Light"
  },
  image3Icon: {
    top: 36,
    left: 279,
    width: 99,
    height: 99,
    position: "absolute"
  },
  tabs: {
    top: 744,
    backgroundColor: "#e9ebff",
    borderColor: "#b6b6ce",
    borderWidth: 2,
    width: 397,
    height: 106,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    left: -2,
    position: "absolute"
  },
  tab: {
    alignItems: "center",
    overflow: "hidden"
  },
  icon: {
    height: "100%",
    width: "100%"
  },
  salir: {
    color: "#929295",
    textAlign: "center",
    fontSize: 12
  },
  principalTab: {
    opacity: 0.5,
    gap: 2,
    justifyContent: "center",
    flex: 1
  },
  nuevoRegistro: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "600"
  },
  dashboardCard: {
    backgroundColor: "#caffc6",
    left: 32
  },
  default: {
    width: 115,
    borderRadius: 100
  },
  estadoGeneral: {
    width: 88,
    color: "#000",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Inter-Bold",
    fontWeight: "700"
  },
  content: {
    height: 45,
    gap: 4
  },
  conectado: {
    lineHeight: 20,
    fontSize: 13,
    fontFamily: "IstokWeb-Bold",
    alignSelf: "stretch"
  },
  principalDashboardCard: {
    left: 197,
    backgroundColor: "#fffdc6"
  },
  principalDefault: {
    width: 123,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  bateria: {
    width: 90,
    fontSize: 12
  },
  text: {
    height: 15,
    lineHeight: 20,
    fontSize: 13,
    fontFamily: "IstokWeb-Bold"
  },
  component2: {
    top: 376,
    left: -6,
    width: 394,
    height: 38,
    position: "absolute"
  },
  component2Child: {
    width: "55.2%",
    right: "-0.19%",
    left: "44.99%"
  },
  eventosReportados: {
    width: "32.23%",
    top: "0%",
    left: "10.41%",
    textAlign: "center",
    height: "100%"
  },
  component2Item: {
    width: "8.5%",
    right: "91.69%",
    left: "-0.19%"
  },
  estadoDelDispositivo: {
    top: 192,
    width: 159,
    color: "#797979",
    textAlign: "left",
    left: 32
  },
  hora: {
    top: 192,
    width: 159,
    color: "#797979",
    textAlign: "right",
    left: 150,
    fontSize: 19,
  },

  default2: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    width: 256,
    borderWidth: 1,
    alignSelf: "flex-start",   // 👈 lo manda a la izquierda
    marginLeft: 35,             // 👈 sin separación
  },
  evento1: {
    width: 132,
    color: "#323449",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Inter-Bold",
    fontWeight: "700"
  },
  materialSymbolsecg: {
    top: 340,
    left: 32,
    width: 60,
    height: 60,
    position: "absolute"
  },
  button: {
    width: "90%",
    height: 44,
    backgroundColor: "#323249",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 50,
    marginTop: 490,   // 🔥 aquí controlas que se quede en ese espacio

  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: "#000", marginRight: 8 },
  checkboxText: { fontSize: 12, color: "#000" },
  registerLink: { fontSize: 12, color: "#323249", fontWeight: "700", marginBottom: 16 },
  imageDecor: {
    height: 100,
  },
  textFieldFlexBox: {
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
});

export default Principal;
