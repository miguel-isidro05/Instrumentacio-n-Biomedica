import { useRouter } from 'expo-router'; // Sirve para navegacion por botones
import * as React from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Componente de registro de sesión (AQUI VA TODO EL CODIGO)
const RegistroDeSesion = () => {
  const [correo, setCorreo] = React.useState("");
  const [usuario, setUsuario] = React.useState("");
  const [nombres, setNombres] = React.useState("");
  const [apellidos, setApellidos] = React.useState("");
  const [contrasena, setContrasena] = React.useState("");

  const router = useRouter();

  const handleRegister = async () => {
    console.log("Correo:", correo);
    console.log("Usuario:", usuario);
    console.log("Nombres:", nombres);
    console.log("Apellidos:", apellidos);
    console.log("Contraseña:", contrasena);

    try {
      const response = await fetch("http://10.41.150.70:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          usuario,
          nombres,
          apellidos,
          contrasena,
        }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.status === "ok") {
        alert("Usuario registrado con éxito!");
        router.push('/(tabs)/menu'); // Redirige a menu
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Error al conectarse al servidor:", error);
      alert("No se pudo conectar al servidor");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Rectángulo que contiene todo el contenido */}
          <View style={styles.rectangle}></View>
            <Text style={styles.title}>Registro</Text>
            <Text style={styles.subtitle}>Llene el formulario con sus datos</Text>

            {/* Inputs */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput style={styles.input} placeholder="Ingrese su correo electrónico" value={correo}
                onChangeText={setCorreo}
                autoCapitalize="none"/>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre de usuario</Text>
              <TextInput style={styles.input} placeholder="Ingrese su nombre de usuario" value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"/>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombres</Text>
              <TextInput style={styles.input} placeholder="Ingrese sus nombres" value={nombres}
                onChangeText={setNombres}
                autoCapitalize="none"/>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Apellidos</Text>
              <TextInput style={styles.input} placeholder="Ingrese sus apellidos" value={apellidos}
                onChangeText={setApellidos}
                autoCapitalize="none"/>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput style={styles.input} placeholder="Ingrese su contraseña" secureTextEntry value={contrasena}
                onChangeText={setContrasena}
                autoCapitalize="none"/>
            </View>

            {/* Botón */}
            <Pressable style={styles.button} onPress={(handleRegister)}>
              <Text style={styles.buttonText}>Crear cuenta</Text>
            </Pressable>

          {/* Imagen decorativa */}
          <Image
            source={require('@/assets/images/image_1.png')}
            style={styles.imageDecor}
            resizeMode="cover"
          />
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  scrollContent: { 
    paddingHorizontal: 24, 
    paddingTop: 16, // <-- menos espacio arriba
    alignItems: "center" 
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 4, alignSelf: "flex-start" },
  subtitle: { fontSize: 12, color: "#6B6B6B", marginBottom: 20, alignSelf: "flex-start" },
  inputContainer: { width: "100%", marginBottom: 12 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 4 },
  input: {
    width: "100%",
    height: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 44,
    backgroundColor: "#323249",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: "#000", marginRight: 8 },
  checkboxText: { fontSize: 12, color: "#000" },
  registerLink: { fontSize: 12, color: "#323249", fontWeight: "700", marginBottom: 16 },
  imageDecor: {
    height: 100,
  },

  rectangle: {
    boxShadow: "0px -244px 68px rgba(0, 0, 0, 0)",
    elevation: 68,
    borderStyle: "solid",
    width: "120%",
    justifyContent: "center",   // centra verticalmente
    alignItems: "center",       // centra horizontalmente
    overflow: "hidden",         // opcional: recorta contenido que sobresalga del borde
    paddingHorizontal: 32,
    position: "relative",
    top: 40, //Necesario para que el rectángulo quede más arriba
    
    borderBottomLeftRadius: 70,   // opcional: redondea solo arriba
    borderBottomRightRadius: 70,   // opcional: redondea solo arriba
  },

});

export default RegistroDeSesion;