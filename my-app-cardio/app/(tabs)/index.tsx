import { useRouter } from 'expo-router'; // Sirve para navegacion por botones
import * as React from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Componente de inicio de sesión (AQUI VA TODO EL CODIGO)
const InicioDeSesion = () => {
  const [usuario, setUsuario] = React.useState("");
  const [contrasena, setContrasena] = React.useState("");

  const router = useRouter();

  const handleLogin = async () => {
    console.log("Uusario:",usuario);
    console.log("Contraseña:",contrasena);

    try {
      // URL de fastAPI
      console.log("Conectando a: http://10.41.150.70:8000/login");

      const response = await fetch(
        `http://10.41.150.70:8000/login?usuario=${encodeURIComponent(usuario)}&contrasena=${encodeURIComponent(contrasena)}`
      );
      const data = await response.json();
      console.log("Respuesta del servidor:",data);

      if (data.status === "ok") {
        // Redirigir a la pantalla principal
        router.push('/(tabs)/menu'); // Redirigue a menu
      } else {
        // Mostrar mensaje de error
        alert(data.message);
      }

    } catch (error) {
      console.error("Error al conectarse al servidor:", error);
      alert("No se pudo conectar al servidor");
    }
  };

  const goRegister = () => {
    // Redirigir a registro
    console.log("Ir a registro");
    router.push('/(tabs)/explore'); // Redirigue a menu
    // navigation.navigate("Registro");
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Logo o imagen decorativa */}
          <Image
            source={require('@/assets/images/image_1.png')} // reemplaza con tu imagen
            style={styles.fullImage}
            resizeMode="cover"
          />

          {/* Rectángulo que contiene todo el contenido */}
          <View style={styles.rectangle}>
            {/* Título y subtítulo */}
            <Text style={styles.title}>Inicio de sesión</Text>
            <Text style={styles.subtitle}>Ingrese los detalles para inicio de sesión</Text>

            {/* Input usuario */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Usuario o correo</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese su usuario o correo"
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
              />
            </View>

            {/* Input contraseña */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese su contraseña"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
              />
            </View>

            {/* Botón de inicio de sesión */}
            <Pressable style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Ingresar sesión</Text>
            </Pressable>

            {/* Link a registro */}
            {/* onPress=redirige a esas variables */}
            <Pressable onPress={goRegister} style={styles.registerContainer}>
              <Text style={styles.registerText}>
                ¿No has creado una cuenta? <Text style={styles.registerLink}>Regístrese aquí</Text>
              </Text>
            </Pressable>

            <Image
            source={require('@/assets/images/image_2.png')} // reemplaza con tu imagen
            style={styles.imag2}
            resizeMode="cover"
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 32,
    
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B6B6B",
    marginBottom: 24,
    alignSelf: "flex-start",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 44,
    backgroundColor: "#323249",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  registerContainer: {
    marginTop: 16,
    alignSelf: "center",
  },
  registerText: {
    fontSize: 12,
    color: "#6B6B6B",
  },
  registerLink: {
    fontWeight: "700",
    color: "#323249",
  },
  rectangle: {
    boxShadow: "0px -244px 68px rgba(0, 0, 0, 0)",
    elevation: 80,
    top: -15, //Necesario para que el rectángulo quede más arriba
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0)",
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    height: 550,
    width: 400,
    
    justifyContent: "center",   // centra verticalmente
    alignItems: "center",       // centra horizontalmente
    borderTopLeftRadius: 70,   // opcional: redondea solo arriba
    borderTopRightRadius: 70,   // opcional: redondea solo arriba
    paddingHorizontal: 32,
    paddingVertical: 24,           // agrega un poco de espacio interno
  },
  fullImage: {
    top: 30, //Top: permite ajustar la imagen al lugar dentro del espacio donde desees verticalmente (left es horizontalmente)
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    
  },
  imag2: {
    height: 70,
    width: "70%",        // opcional: ajusta al ancho del contenedor
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,        // <-- espacio entre el link y la imagen  
  }
});

export default InicioDeSesion;
