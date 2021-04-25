import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import { useSpring, animated } from 'react-spring/web.cjs' // web.cjs is required for IE 11 support
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '500px'
  },
  title: {
    margin: '20 0 20 0'
  }
}))

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    }
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  )
})

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
}

export default function SpringModal(props) {
  const classes = useStyles()
  const {
    open,
    handleClose,
    confirmMessage,
    confirmTitle,
    setOpenConfirmModal,
    handleConfirmClick
  } = props

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 50
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h5" component="h4" className={classes.title}>
              {confirmTitle}
            </Typography>
            <Typography variant="h8" component="h4">
              {confirmMessage}
            </Typography>
            <br />
            <div className="p-0 flex row justify-between align-center">
              <Button
                variant="contained"
                size="small"
                startIcon={<DeleteForeverIcon />}
                onClick={handleConfirmClick}
                color="primary"
              >
                YES
              </Button>
              <Button
                variant="contained"
                color="default"
                size="small"
                startIcon={<CloseIcon />}
                onClick={() => {
                  setOpenConfirmModal(false)
                }}
              >
                NO
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
