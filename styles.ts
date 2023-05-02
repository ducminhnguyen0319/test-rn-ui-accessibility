import React from 'react';
import {
  ColorSchemeName,
  Platform,
  StatusBarStyle,
  useColorScheme,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export const DARK_THEME = {
  ...MD3DarkTheme,
  dark: true,
  statusBarStyle: 'light-content',
  colors: {
    primary: 'rgb(235, 178, 255)',
    onPrimary: 'rgb(82, 0, 113)',
    primaryContainer: 'rgb(114, 17, 153)',
    onPrimaryContainer: 'rgb(248, 216, 255)',
    secondary: 'rgb(206, 189, 255)',
    onSecondary: 'rgb(57, 5, 144)',
    secondaryContainer: 'rgb(80, 43, 167)',
    onSecondaryContainer: 'rgb(232, 221, 255)',
    tertiary: 'rgb(165, 200, 255)',
    onTertiary: 'rgb(0, 49, 95)',
    tertiaryContainer: 'rgb(0, 71, 134)',
    onTertiaryContainer: 'rgb(212, 227, 255)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(30, 27, 30)',
    onBackground: 'rgb(232, 224, 229)',
    surface: 'rgb(30, 27, 30)',
    onSurface: 'rgb(232, 224, 229)',
    surfaceVariant: 'rgb(76, 68, 77)',
    onSurfaceVariant: 'rgb(206, 195, 205)',
    outline: 'rgb(151, 142, 151)',
    outlineVariant: 'rgb(76, 68, 77)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(232, 224, 229)',
    inverseOnSurface: 'rgb(51, 47, 51)',
    inversePrimary: 'rgb(140, 51, 179)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(40, 35, 41)',
      level2: 'rgb(46, 39, 48)',
      level3: 'rgb(53, 44, 55)',
      level4: 'rgb(55, 45, 57)',
      level5: 'rgb(59, 48, 62)',
    },
    surfaceDisabled: 'rgba(232, 224, 229, 0.12)',
    onSurfaceDisabled: 'rgba(232, 224, 229, 0.38)',
    backdrop: 'rgba(53, 46, 54, 0.4)',
  },
};

export const LIGHT_THEME = {
  ...MD3LightTheme,
  dark: false,
  statusBarStyle: 'dark-content',
  colors: {
    primary: 'rgb(140, 51, 179)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(248, 216, 255)',
    onPrimaryContainer: 'rgb(50, 0, 71)',
    secondary: 'rgb(104, 71, 192)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(232, 221, 255)',
    onSecondaryContainer: 'rgb(33, 0, 93)',
    tertiary: 'rgb(0, 95, 175)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(212, 227, 255)',
    onTertiaryContainer: 'rgb(0, 28, 58)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(30, 27, 30)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(30, 27, 30)',
    surfaceVariant: 'rgb(235, 223, 233)',
    onSurfaceVariant: 'rgb(76, 68, 77)',
    outline: 'rgb(125, 116, 125)',
    outlineVariant: 'rgb(206, 195, 205)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(51, 47, 51)',
    inverseOnSurface: 'rgb(246, 239, 243)',
    inversePrimary: 'rgb(235, 178, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(249, 241, 251)',
      level2: 'rgb(246, 235, 249)',
      level3: 'rgb(242, 229, 247)',
      level4: 'rgb(241, 227, 246)',
      level5: 'rgb(239, 223, 244)',
    },
    surfaceDisabled: 'rgba(30, 27, 30, 0.12)',
    onSurfaceDisabled: 'rgba(30, 27, 30, 0.38)',
    backdrop: 'rgba(53, 46, 54, 0.4)',
  },
};

const getStyles = ({paper}: {paper: typeof LIGHT_THEME}) =>
  StyleSheet.create({
    statusBar: {
      backgroundColor: paper.colors.background,
      barStyle: paper.statusBarStyle as StatusBarStyle,
    },
    safeArea: {
      backgroundColor: paper.colors.background,
      width: '100%',
      height: '100%',
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
      flex: 1,
      gap: 10,
      backgroundColor: paper.colors.background,
    },
    container: {
      flex: 1,
      gap: 10,
      padding: 10,
      backgroundColor: paper.colors.background,
    },
    bottomUpContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      gap: 10,
      padding: 10,
      backgroundColor: paper.colors.background,
    },
    modal: {
      borderRadius: 4,
      padding: 10,
      backgroundColor: paper.colors.background,
      height: '80%',
      width: '90%',
    },
    timePicker: {
      maxHeight: 150,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    appBar: {
      backgroundColor: paper.colors.primary,
      height: APPBAR_HEIGHT,
    },
    content: {
      backgroundColor: paper.colors.background,
      flex: 1,
    },
    textInsidePrimaryButton: {
      textAlign: 'center',
      color: paper.colors.onPrimary,
    },
    searchLocationInput: {
      flex: 1,
      height: 60,
      backgroundColor: paper.colors.surfaceVariant,
    },
    horizontalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    horizontalContainer1: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: 10,
      justifyContent: 'center',
    },
  });

const getPaperScheme = (porps: {colorScheme: ColorSchemeName}) => {
  return porps.colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME;
};

export function usePaperScheme() {
  const colorScheme = useColorScheme();
  const paper = React.useMemo(
    () => getPaperScheme({colorScheme}),
    [colorScheme],
  );
  return paper;
}

function useStyles() {
  const paper = usePaperScheme();
  //Recompute styles after update themes
  const styles = React.useMemo(() => getStyles({paper}), [paper]);
  return styles;
}

export default useStyles;
