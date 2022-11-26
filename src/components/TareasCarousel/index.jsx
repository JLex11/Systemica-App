import clsx from 'clsx'
import { memo, useEffect, useRef, useState } from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './tareasCarousel.module.css'

const TareasCarousel = ({ tareas }) => {
  const [hideArrows, setHideArrows] = useState({ left: false, right: false })

  const carouselRef = useRef(null)
  const arrowLeftRef = useRef(null)
  const arrowRightRef = useRef(null)
  
  useEffect(() => {
    if (tareas.length > 1) {
      const carousel = carouselRef.current
      const arrowLeft = arrowLeftRef.current
      const arrowRight = arrowRightRef.current

      let carouselItems = carousel.querySelectorAll(`.${styles.CarouselItem}`)
      let carouselItemsCount = carouselItems.length
      let carouselItemsWidth, carouselWidth, carouselMaxScroll, carouselScrollStep
      let carouselScrollLeft = 0

      const calculateCarouselValues = () => {
        carouselItemsWidth = carouselItems[0].offsetWidth
        carouselWidth = carouselItemsWidth * carouselItemsCount
        carouselMaxScroll = carouselWidth - carousel.offsetWidth
        carouselScrollStep = carouselItemsWidth * 1
      }

      calculateCarouselValues()
      setHideArrows({ left: carouselScrollLeft != 0, right: carouselScrollLeft != carouselMaxScroll })

      const handleClickArrowLeft = e => {
        e.preventDefault()
        carouselScrollLeft -= carouselScrollStep
        carouselScrollLeft = Math.max(0, Math.min(carouselScrollLeft, carouselMaxScroll))
        carousel.scrollTo({ left: carouselScrollLeft, behavior: 'smooth' })
        setHideArrows({ left: carouselScrollLeft != 0, right: carouselScrollLeft != carouselMaxScroll })
      }

      const handleClickArrowRight = e => {
        e.preventDefault()
        carouselScrollLeft += carouselScrollStep
        carouselScrollLeft = Math.max(0, Math.min(carouselScrollLeft, carouselMaxScroll))
        carousel.scrollTo({ left: carouselScrollLeft, behavior: 'smooth' })
        setHideArrows({ left: carouselScrollLeft != 0, right: carouselScrollLeft != carouselMaxScroll })
      }
      
      const handleWheel = event => {
        event.preventDefault()
        carouselScrollLeft += event.deltaY > 0 ? carouselScrollStep : -carouselScrollStep
        carouselScrollLeft = Math.max(0, Math.min(carouselScrollLeft, carouselMaxScroll))
        carousel.scrollTo({ left: carouselScrollLeft })
        setHideArrows({ left: carouselScrollLeft != 0, right: carouselScrollLeft != carouselMaxScroll })
      }
      
      const observer = new MutationObserver(calculateCarouselValues)
      observer.observe(document.body, { attributes: true, childList: true, subtree: true })
      carousel.addEventListener('wheel', handleWheel)
      addEventListener('resize', calculateCarouselValues)
      arrowLeft.addEventListener('click', handleClickArrowLeft)
      arrowRight.addEventListener('click', handleClickArrowRight)
      return () => {
        carousel.removeEventListener('wheel', handleWheel)
        removeEventListener('resize', calculateCarouselValues)
        arrowLeft.removeEventListener('click', handleClickArrowLeft)
        arrowRight.removeEventListener('click', handleClickArrowRight)
        observer.disconnect()
      }
    }
  }, [tareas])

  const stylesArrowLeft = clsx(styles.Arrow, styles.ArrowLeft, [
    !hideArrows.left && styles.ArrowHide,
  ])
  
  const stylesArrowRight = clsx(styles.Arrow, styles.ArrowRight, [
    !hideArrows.right && styles.ArrowHide,
  ])

  return (
    <div className={styles.CarouselContainer}>
      <div className={styles.Carousel} ref={carouselRef} >
        <button className={stylesArrowLeft} ref={arrowLeftRef} id='CarouselButton_Back'>
          <BsChevronDoubleLeft />
        </button>
        {tareas.map(tarea => (
          <Link to={`/tareas/${tarea.id_tarea}`} className={styles.CarouselItem} key={tarea.id_tarea}>
            <h5>{tarea.titulo}</h5>
          </Link>
        ))}
        <button className={stylesArrowRight} ref={arrowRightRef} id='CarouselButton_Next'>
          <BsChevronDoubleRight />
        </button>
      </div>
    </div>
  )
}

export default memo(TareasCarousel)