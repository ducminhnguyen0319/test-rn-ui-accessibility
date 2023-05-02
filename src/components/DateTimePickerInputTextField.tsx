import React, {useRef, useState} from 'react';

import DatePicker from 'react-native-date-picker';
import {TextInput, View} from 'react-native';
import {TextInput as PageTextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import {usePaperScheme} from '../../styles';

const FORMATS = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm',
  datetimefull: 'dddd MMMM DD, yyyy H:mm',
  time: 'HH:mm',
};

interface DateTimePickerInputTextFieldProps {
  onSelected: (date: Date) => void;
}

const DateTimePickerInputTextField = (
  props: DateTimePickerInputTextFieldProps,
) => {
  Moment.locale('en');
  const current = new Date();
  const [show, setShow] = useState(false);
  const [confirmDate, setConfirmDate] = useState<Date | undefined>(undefined);
  const inputRef = useRef<TextInput>(null);
  const paperScheme = usePaperScheme();

  const onDateChange = (selectedDate: Date) => {
    console.log(selectedDate);
    setConfirmDate(selectedDate);
    setShow(false);
    props.onSelected(selectedDate);
  };

  const onCancel = () => {
    console.log('onCancel');
    setShow(false);
  };

  const onFocus = () => {
    inputRef?.current?.blur();
    setShow(true);
  };

  return (
    <>
      <View
        accessible={true}
        accessibilityLabel={
          confirmDate !== undefined
            ? Moment(confirmDate).format(FORMATS.datetimefull)
            : undefined
        }
        accessibilityHint="Press to open date picker">
        <PageTextInput
          ref={inputRef}
          left={
            <PageTextInput.Icon
              accessible={false}
              // eslint-disable-next-line react/no-unstable-nested-components
              icon={() => (
                <Icon
                  name="calendar"
                  size={24}
                  color={paperScheme.colors.onSurfaceVariant}
                />
              )}
            />
          }
          label="Select pickup date"
          value={
            confirmDate !== undefined
              ? Moment(confirmDate).format(FORMATS.datetimefull)
              : undefined
          }
          showSoftInputOnFocus={false}
          onFocus={onFocus}
        />
      </View>
      <DatePicker
        accessible={true}
        accessibilityLabel="date time picker"
        title="Select pickup date"
        onConfirm={onDateChange}
        onCancel={onCancel}
        date={confirmDate ?? current}
        minimumDate={current}
        open={show}
        locale="en-GB"
        modal={true}
        androidVariant="iosClone"
        minuteInterval={5}
      />
    </>
  );
};

export default DateTimePickerInputTextField;
