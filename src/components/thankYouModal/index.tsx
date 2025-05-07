"use client"

import type React from "react";
import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { CircleCheck } from 'lucide-react';
import styles from "./thankYouModal.module.scss";

interface ThankYouModalProps {
  show: boolean
  onHide: () => void
  title?: string
  message?: string
  buttonText?: string
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({
  show,
  onHide,
  title = "Thank You!",
  message = "Your form has been successfully submitted. We appreciate your time and will get back to you soon.",
  buttonText = "Close",
}) => {
  // Add animation class after modal is shown for entrance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const checkmark = document.querySelector(`.${styles.checkmarkCircle}`)
      if (checkmark) {
        checkmark.classList.add(styles.animate)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [show])

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName={styles.modalContent}
      backdropClassName={styles.modalBackdrop}
    >
      <div className={styles.modalWrapper}>
        <div className={styles.checkmarkContainer}>
          <div className={styles.checkmarkCircle}>
            <CircleCheck  className={styles.checkIcon} />
          </div>
        </div>

        <Modal.Header className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.modalBody}>
          <p className={styles.message}>{message}</p>
        </Modal.Body>

        <Modal.Footer className={styles.modalFooter}>
          <Button variant="primary" onClick={onHide} className={styles.closeButton}>
            {buttonText}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}

export default ThankYouModal;

