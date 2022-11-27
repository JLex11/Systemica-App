import { memo } from 'react'
import { TailSpin } from 'react-loader-spinner'
import styles from './loading.module.css'

const LoadingSpinner = () => (
  <div className={styles.TailSpinContainer}>
    <TailSpin width={100} color='#743ed6' className={styles.TailSpinLoading} />
  </div>
)

export default memo(LoadingSpinner)