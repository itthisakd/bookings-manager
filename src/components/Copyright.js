import React from 'react'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
/** @jsxImportSource @emotion/react */

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">I. D.</Link> {'2021'}
      {'.'}
    </Typography>
  )
}
