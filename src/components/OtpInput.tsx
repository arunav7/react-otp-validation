import { useEffect, useRef, useState } from 'react';

import { OTPVerificationModes, OtpVerificationProps } from '@/types';
import { Button, Container, Flex, Input, Text } from '@chakra-ui/react';
import { useLanguageContext } from '@/context/languageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageModeEnum } from '@/constants';

const OtpInput = ({ length, mode, onSuccessfulVerification, onReset }: OtpVerificationProps) => {
  const [otpInput, setOtpInput] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement>>([]);
  const { language } = useLanguageContext();
  const { t } = useTranslation(language as LanguageModeEnum);

  const modeText = mode === OTPVerificationModes.PHONE ? t('phone.otp.mode') : t('email.otp.mode');

  useEffect(() => {
    // focus on first input box on component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;
    const newOtpInput = [...otpInput];
    // always take the last index value of the otp entered
    newOtpInput[index] = value.substring(value.length - 1);
    setOtpInput(newOtpInput);

    // focus next input box
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    const combinedotp = newOtpInput.join('');
    if (combinedotp.length === length) {
      onSuccessfulVerification(combinedotp);
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // focus to first occurrence of empty input box
    if (index > 0 && !otpInput[index - 1]) {
      inputRefs.current[otpInput.indexOf('')].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpInput[index] && index > 0 && inputRefs.current[index - 1]) {
      // Move focus to the previous input box on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Container
      alignItems={'center'}
      justifyContent={'space-around'}
      display={'flex'}
      flexDirection={'column'}
      width={300}
      height={250}
      borderRadius={10}
      shadow={'md'}
      shadowColor={'gray.200'}
    >
      <Text textStyle='2xl'>{t('otp.sent.message', { mode: modeText })}</Text>
      <Flex
        gap={4}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {otpInput.map((value, index) => {
          return (
            <Input
              variant={'subtle'}
              width={10}
              key={index}
              ref={(input) => (inputRefs.current[index] = input as HTMLInputElement)}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          );
        })}
      </Flex>
      <Button
        variant='ghost'
        color='thistle'
        marginTop={4}
        onClick={onReset}
      >
        {t('reset.button.text')}
      </Button>
    </Container>
  );
};

export default OtpInput;
