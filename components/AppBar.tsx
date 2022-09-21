import React, { ReactNode, useState } from 'react'

import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Toolbar,
  Typography
} from '@mui/material'

import { Footer } from './Footer'
import { DRAWER_WIDTH } from '../utils/constants'

interface Props {
  children: ReactNode
}

export default function AppBarComponent(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        日中翻訳
      </Typography>
      <Divider />
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            日中翻訳
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ p: 3 }}
        style={{ margin: '0 auto', width: '100%' }}
      >
        <Toolbar />
        {props.children}
      </Box>

      <Footer />
    </Box>
  )
}
