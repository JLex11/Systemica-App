import { memo, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import InstitucionItem from '../InstitucionItem'
import styles from './institucionesCarousel.module.css'

const InstitucionesCarousel = ({ instituciones }) => {
  const carouselRef = useRef(null)
  const { id } = useParams()
  
  useEffect(() => {
    if (instituciones.length > 1) {
      const carousel = carouselRef.current

      let carouselItems = carousel.querySelectorAll(`.${styles.CarouselItem}`)
      let carouselItemsCount = carouselItems.length
      let carouselItemsWidth, carouselMaxScroll, carouselScrollStep, wInnerWidth
      let carouselScrollLeft = 0

      const calculateCarouselValues = () => {
        carouselItemsWidth = carouselItems[0].offsetWidth
        carouselMaxScroll = carouselItemsWidth * carouselItemsCount // carousel width
        carouselScrollStep = carouselItemsWidth * 1
        wInnerWidth = window.innerWidth
      }

      calculateCarouselValues()
      
      const handleWheel = event => {
        if (wInnerWidth < 775) return
        
        event.preventDefault()
        carouselScrollLeft += event.deltaY > 0 ? carouselScrollStep : -carouselScrollStep
        carouselScrollLeft = Math.max(0, Math.min(carouselScrollLeft, carouselMaxScroll))
        carousel.scrollTo({ left: carouselScrollLeft })
      }

      const observer = new MutationObserver(calculateCarouselValues)
      observer.observe(document.body, { attributes: true/* , childList: true, subtree: true */ })
      
      carousel.addEventListener('wheel', handleWheel)
      addEventListener('resize', calculateCarouselValues)
      return () => {
        carousel.removeEventListener('wheel', handleWheel)
        removeEventListener('resize', calculateCarouselValues)
        observer.disconnect()
      }
    }
  }, [instituciones, id])

  return (
    <div className={styles.CarouselContainer}>
      <div className={styles.Carousel} ref={carouselRef}>
        {instituciones.map(institucion => (
          <div
            className={styles.CarouselItem} key={institucion.id_institucion_educativa}>
            <InstitucionItem
              key={institucion.id_institucion_educativa}
              institucion={institucion}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(InstitucionesCarousel)