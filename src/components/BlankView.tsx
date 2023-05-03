import React from 'react';

import {View} from 'react-native';
import useStyles from '../../styles';

const BlankView = ({display}: {display: boolean}) => {
  const styles = useStyles();
  return display ? <View style={styles.containerBlank} /> : null;
};

export default BlankView;
