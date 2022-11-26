import { memo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import EstablecimientoItem from '../EstablecimientoItem';
import styles from './establecimientosCarousel.module.css';

const EstablecimientosCarousel = ({ establecimientos }) => {

  const carouselRef = useRef(null);

  const { id } = useParams();
  
  useEffect(() => {
    if (establecimientos.length > 1) {
      const carousel = carouselRef.current;

      let carouselItems = carousel.querySelectorAll(`.${styles.CarouselItem}`);
      let carouselItemsCount = carouselItems.length;
      let carouselItemsWidth, carouselWidth, carouselMaxScroll, carouselScrollStep;
      let carouselScrollLeft = 0;

      const calculateCarouselValues = (() => {
        carouselItemsWidth = carouselItems[0].offsetWidth;
        carouselWidth = carouselItemsWidth * carouselItemsCount;
        carouselMaxScroll = carouselWidth - carousel.offsetWidth - 80;
        carouselScrollStep = carouselItemsWidth * 1.1;
      });

      calculateCarouselValues();

      const observer = new MutationObserver(calculateCarouselValues);
      observer.observe(document.body, { attributes: true, childList: true, subtree: true });
      
      const handleWheel = event => {
        event.preventDefault();
        carouselScrollLeft += event.deltaY > 0 ? carouselScrollStep : -carouselScrollStep;
        carouselScrollLeft = Math.max(0, Math.min(carouselScrollLeft, carouselMaxScroll));
        carousel.scrollTo({ left: carouselScrollLeft });
      };
      
      carousel.addEventListener('wheel', handleWheel);
      carousel.addEventListener('resize', calculateCarouselValues);
      return () => {
        carousel.removeEventListener('wheel', handleWheel);
        carousel.removeEventListener('resize', calculateCarouselValues);
        observer.disconnect();
      };
    }
  }, [establecimientos, id]);

  return (
    <div className={styles.CarouselContainer}>
      <div className={styles.Carousel} ref={carouselRef} style={{ paddingInline: '80px' }}>
        {establecimientos.map(establecimiento => (
          <div
            className={styles.CarouselItem} key={establecimiento.id_establecimiento}>
            <EstablecimientoItem
              key={establecimiento.id_establecimiento}
              establecimiento={establecimiento}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(EstablecimientosCarousel);