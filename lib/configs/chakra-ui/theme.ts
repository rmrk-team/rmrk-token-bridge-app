import {
  extendTheme,
  StyleFunctionProps,
  SystemStyleInterpolation,
} from "@chakra-ui/react";

const gray = {
  900: "#171d28",
  800: "#1a202c",
  700: "#313641",
  600: "#484d56",
  500: "#4A5568",
  400: "#718096",
  300: "#8d9096",
  200: "#a3a6ab",
  100: "#babcc0",
  50: "#EDF2F7",
};

const pinkPurpleGradientColorScheme = {
  full: "linear-gradient(to right, #FF3696,  #A168FC)",
  start: "#FF3696",
  end: "#A168FC",
};

const pinkPurpleFaintGradientColorScheme = {
  full: "linear-gradient(to right, #FF369650,  #A168FC50)",
  start: "#FF369650",
  end: "#A168FC50",
};

const themeConfig = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    gray,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
      },
      variants: {
        solid: (props: StyleFunctionProps) => ({
          ...(props.colorScheme === "pinkDark"
            ? {
                backgroundColor: "pink.800",
                borderColor: "pink.700",
                borderWidth: "2px",
                fontWeight: "bold",
                color: "white",
              }
            : {}),
          ...(props.colorScheme === "pinkPurpleGradient"
            ? {
                color: "white",
                fontWeight: "bold",
                bgGradient: pinkPurpleGradientColorScheme.full,
                _hover: {
                  opacity: "0.7",
                  _disabled: {
                    opacity: "0.4",
                    bgGradient: pinkPurpleGradientColorScheme.full,
                  },
                },
                _active: {
                  opacity: "0.7",
                },
              }
            : {}),
          ...(props.colorScheme === "pinkPurpleFaintGradient"
            ? {
                color: "white",
                fontWeight: "bold",
                bgGradient: pinkPurpleFaintGradientColorScheme.full,
                _hover: {
                  opacity: "0.7",
                  _disabled: {
                    opacity: "0.4",
                    bgGradient: pinkPurpleFaintGradientColorScheme.full,
                  },
                },
                _active: {
                  opacity: "0.7",
                },

                _before: {
                  content: '""',
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  borderRadius: "full",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: "transparent",
                  background: `${pinkPurpleGradientColorScheme.full} border-box`,
                  mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  //version for Mozilla FF
                  maskComposite: "subtract",
                  //version for Chrome
                  WebkitMaskComposite: "destination-out",
                },
              }
            : {}),
        }),
        outline: (props: StyleFunctionProps) => ({
          ...(props.colorScheme === "pinkDark"
            ? {
                borderColor: "pink.300",
                borderWidth: "2px",
                fontWeight: "semibold",
                color: "pink.400",
              }
            : {}),
          ...(props.colorScheme === "gray"
            ? {
                borderColor: "gray.500",
              }
            : {}),
        }),
        "outline-angular": (props: StyleFunctionProps) => ({
          borderRadius: "2px",
          ...(props.colorScheme === "pinkDark"
            ? {
                borderColor: "pink.300",
                borderWidth: "1px",
                fontWeight: "bold",
                color: "pink.400",
              }
            : {}),
          ...(props.size === "xs"
            ? {
                px: "6px",
                h: "18px",
                fontSize: "sm",
                pb: "1px",
              }
            : {}),
        }),
      },
    },
  },
  styles: {
    global: (props: SystemStyleInterpolation) => ({
      "html, body": {
        background: "gray.800",
        color: "white",
      },
      "#__next > div": {
        display: "flex",
        flexDirection: "column",
        minH: "100vh",
      },
    }),
  },
};

export const theme = extendTheme(themeConfig);
