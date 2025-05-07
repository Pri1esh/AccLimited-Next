import { Modal } from 'react-bootstrap';
import { IoClose } from "react-icons/io5";
import styles from './videoModal.module.scss';
import { IVideoModalProps } from '@interfaces';


function isYouTubeUrl(url: string): boolean {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
}

function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

const baseURL = process.env.NEXT_PUBLIC_STAGING_LINK || '';

export default function VideoModal({ show, videoURL, onClose }: IVideoModalProps) {
  return (
    <Modal show={show} onHide={onClose} centered size="lg" className={styles.videoModal}>
      <Modal.Header className={styles.modalHeader}>
        <IoClose
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close video"
          color={'white'}
        />
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        {videoURL && (
          <div className={styles.videoWrapper}>
            {isYouTubeUrl(videoURL) ? (
              <iframe
                src={`${videoURL}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isDirectVideoFile(videoURL) ? (
              <video controls autoPlay className={styles.videoPlayer}>
                <source src={baseURL + videoURL} type={`video/${videoURL.split('.').pop()}`} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Unsupported video format.</p>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}


