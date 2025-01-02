import { useState } from 'react';
import { Button, Input, Text, Flex, VStack, Container } from '@chakra-ui/react';

import OtpInput from '@/components/OtpInput';

import { Field } from '@/chakra-components/ui/field';
import { useOtpForm } from '@/hooks/useOtpForm';
import { OTPVerificationModes, VeifyOtpType } from '@/types';
import { BARRED_OTP, LanguageModeEnum, LanguageModeOptions } from './constants';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from './chakra-components/ui/select';
import { useLanguageContext } from './context/languageContext';
import { useTranslation } from '@/hooks/useTranslation';

export default function App() {
  const { language, setLanguage } = useLanguageContext();
  const { t } = useTranslation(language as LanguageModeEnum);
  const [showOtpVerification, setShowOtpverification] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [mode, setMode] = useState<OTPVerificationModes | null>(null);
  const [verify, setVerify] = useState<VeifyOtpType | null>({ error: null, message: null });
  const { register, reset, handleSubmit, errors } = useOtpForm(mode, t);
  const errorMessage = t('otp.validation.fail');
  const successMessage = t('otp.validation.success');

  const languageOptions = LanguageModeOptions({
    hindi: t('hindi.language'),
    english: t('english.language'),
  });

  const handleSelectChange = (e: any) => {
    setValue(e.value);
    setLanguage(e.value[0]);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setShowOtpverification(true);

    reset();
  });

  const onOtpSubmit = (otp: string) => {
    if (BARRED_OTP.includes(otp)) {
      console.log('Otp barred', otp);
      setVerify({ ...verify, error: true, message: errorMessage });
      return;
    }
    console.log('Otp verifed successfully', otp);
    setVerify({ ...verify, error: false, message: successMessage });
  };

  const renderSelectOptions = () => {
    return (
      <SelectRoot
        collection={languageOptions}
        width='220px'
        value={value}
        variant='subtle'
        onValueChange={(e) => handleSelectChange(e)}
        alignSelf={'flex-end'}
        marginTop={4}
      >
        <SelectTrigger>
          <SelectValueText placeholder={t('select.language.label')} />
        </SelectTrigger>
        <SelectContent>
          {languageOptions.items.map((language) => (
            <SelectItem
              item={language}
              key={language.value}
            >
              {language.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    );
  };

  const renderOtpMode = () => {
    return (
      <Flex
        gap={4}
        marginBottom={4}
      >
        <Button
          size='xl'
          variant='subtle'
          onClick={() => setMode(OTPVerificationModes.PHONE)}
        >
          {t('verify.via.phone')}
        </Button>
        <Button
          size='xl'
          variant='surface'
          onClick={() => setMode(OTPVerificationModes.EMAIL)}
        >
          {t('verify.via.email')}
        </Button>
      </Flex>
    );
  };

  const renderPhoneNumberFeild = () => {
    return (
      <Field
        errorText={errors.phoneNumber?.message}
        invalid={!!errors.phoneNumber}
      >
        <Input
          width={200}
          variant='subtle'
          placeholder={t('enter.phone.placeholder')}
          fontSize={16}
          {...register('phoneNumber')}
        />
      </Field>
    );
  };

  const renderEmailFeild = () => {
    return (
      <Field
        errorText={errors.email?.message}
        invalid={!!errors.email}
      >
        <Input
          width={200}
          variant='subtle'
          placeholder={t('enter.email.placeholder')}
          fontSize={16}
          {...register('email')}
        />
      </Field>
    );
  };

  const renderForm = () => {
    if (!mode) return null;

    return (
      <>
        {!!showOtpVerification ? (
          <OtpInput
            length={4}
            onSuccessfulVerification={onOtpSubmit}
            onReset={() => {
              setShowOtpverification(false);
              setVerify(null);
              setMode(null);
            }}
            mode={mode}
          />
        ) : (
          <form onSubmit={onSubmit}>
            <Flex
              gap={4}
              alignItems='center'
              justifyContent='center'
            >
              {mode === OTPVerificationModes.PHONE ? renderPhoneNumberFeild() : renderEmailFeild()}
              <Button
                type='submit'
                variant='outline'
              >
                {t('send.otp.btn.text')}
              </Button>
            </Flex>
          </form>
        )}
      </>
    );
  };

  return (
    <Container
      display='flex'
      flexDirection='column'
      alignItems='center'
    >
      {renderSelectOptions()}
      <VStack>
        <Text
          textStyle='4xl'
          marginBottom={20}
        >
          {t('screen.header')}
        </Text>
        {!mode && renderOtpMode()}
        {renderForm()}
        {!!verify && !!verify.message && (
          <Text
            textStyle='xl'
            style={{ color: verify.error ? 'red' : 'green' }}
          >
            {verify.message}
          </Text>
        )}
      </VStack>
    </Container>
  );
}
