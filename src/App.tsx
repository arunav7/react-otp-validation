import { useState } from 'react';
import { Button, Input, Text, Flex, VStack } from '@chakra-ui/react';

import OtpInput from '@/components/OtpInput';

import { Field } from '@/chakra-components/ui/field';
import { useOtpForm } from '@/hooks/useOtpForm';
import { OTPVerificationModes } from '@/types';

export default function App() {
  const [showOtpVerification, setShowOtpverification] = useState(false);
  const [mode, setMode] = useState<OTPVerificationModes | null>(null);
  const [success, setSuccess] = useState(false);
  const { register, reset, handleSubmit, errors } = useOtpForm(mode);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setShowOtpverification(true);

    reset();
  });

  const onOtpSubmit = (otp: string) => {
    console.log('Otp verifed successfully', otp);
    setSuccess(true);
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
          Verify via Phone
        </Button>
        <Button
          size='xl'
          variant='surface'
          onClick={() => setMode(OTPVerificationModes.EMAIL)}
        >
          Verify via Email
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
          placeholder='Enter phoneNumber'
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
          placeholder='Enter email'
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
              setSuccess(false);
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
                Send Otp
              </Button>
            </Flex>
          </form>
        )}
      </>
    );
  };

  return (
    <div className='App'>
      <VStack>
        <Text
          textStyle='4xl'
          marginBottom={20}
        >
          OTP Login
        </Text>
        {!mode && renderOtpMode()}
        {renderForm()}
        {success && <Text textStyle='xl'>Otp verifed successfully</Text>}
      </VStack>
    </div>
  );
}
