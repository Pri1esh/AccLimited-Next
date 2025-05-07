'use client';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './subscribeForm.module.scss';
import { useState, useEffect } from 'react';
import { emailValidatorRegex } from '@utils';
import { ThankYouModal } from '@components';
import { ENDPOINT, postAPI } from '@api-manager';

const SubscribeForm = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [subscribing, setsubscribing] = useState<boolean>(false);

  const addCaptcha = () => {
    if (!document.getElementById('recaptcha')) {
      try {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_APP_SITE_KEY}`;
        script.id = 'recaptcha';

        script.onload = () => {
          console.log('reCAPTCHA script loaded successfully.');
          const badge = document.querySelector('.grecaptcha-badge');
          if (badge) {
            badge.classList.remove('d-none');
          } else {
            console.warn('grecaptcha-badge element not found.');
          }
        };

        script.onerror = (error) => {
          console.error('Failed to load reCAPTCHA script:', error);
        };

        document.body.appendChild(script);
      } catch (err) {
        console.error('An error occurred while adding the reCAPTCHA script:', err);
      }
    } else {
      console.log('reCAPTCHA script already added.');
    }
  };

  const removeCaptcha = () => {
    if (typeof window !== 'undefined' && sessionStorage?.getItem('getInTouchPage') !== 'true') {
      document.getElementById('recaptcha')?.remove();
      document.querySelector('.grecaptcha-badge')?.classList?.add('d-none');
    }
  };

  const executeRecaptcha = async () => {
    const token = await new Promise((resolve) => {
      /*NOSONAR*/ grecaptcha.ready(async () => {
        const token = await grecaptcha.execute(process.env.NEXT_PUBLIC_APP_SITE_KEY ?? '', {
          action: 'submit',
        });
        resolve(token);
      });
    });

    return token;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(''); // clear error on input change
  };

  const validateEmail = (email: string): boolean => {
    // Simple regex for email validation
    const emailRegex = emailValidatorRegex;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if empty
    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const captchaResponse = await executeRecaptcha();

      const headers = 'Content-Type: application/json';
      const payload = {
        CaptchaResponse: captchaResponse,
        email: email,
      };
      const result = await postAPI(ENDPOINT.CLIENT.subscribeUs, payload, headers);
      setsubscribing(false);

      if (result?.status == '1') {
        setEmail('');
        setShowModal(true);
        setError('');
      } else {
        setError(result?.message);
      }
      console.log('result', result?.status);
    } catch (error) {
      setsubscribing(false);

      console.error('Error subscribing:', error);
      setError('An error occurred. Please try again later.');
    }

  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    addCaptcha();
    return () => {
      removeCaptcha();
    };
  }, []);

  return (
    <>
      <section className={`${styles.emailFormSection} st`}>
        <Container>
          <Row className={styles.formContainer}>
            <Col lg={6} className='d-flex align-items-center'>
              <h3 className={styles.heading}>Subscribe to our Investor updates</h3>
            </Col>
            <Col lg={6}>
              <div className={styles.formBox}>
                <form onSubmit={handleSubmit} noValidate>
                  <input
                    type="email"
                    onChange={handleInputChange}
                    value={email}
                    placeholder="Enter Email Address"
                    maxLength={254}
                    className={error ? styles.errorInput : ''}
                  />
                  <button type="submit" className={styles.submitButton}>
                   {subscribing ? 'Subscribing...' : 'Subscribe Now'}
                  </button>
                </form>
                {error && <span className={styles.error}>{error}</span>}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ThankYouModal
        show={showModal}
        onHide={handleCloseModal}
        title="Thank You!"
        message="We've received your message and will get back to you as soon as possible."
        buttonText="Got it!"
      />
    </>
  );
};

export default SubscribeForm;
