// /app/provider.tsx

'use client'

import { UserProvider } from '@/app/context/UserContext'
import { Web3Provider } from '@/app/context/Web3Provider'
import {
  MantineProvider,
  Loader as MantineLoader,
  createTheme,
} from '@mantine/core'
import { Suspense } from 'react'

// Mantine loader config
const mantineTheme = createTheme({
  components: {
    Loader: MantineLoader.extend({
      defaultProps: {
        loaders: {
          ...MantineLoader.defaultLoaders,
          // custom: CustomLoader,
        },
        type: 'custom',
      },
    }),
  },
})

export default function AppProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Web3Provider>
      <MantineProvider theme={mantineTheme}>
        <UserProvider>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen">
                {/* <CustomLoader /> */}
              </div>
            }
          >
            {children}
          </Suspense>
        </UserProvider>
      </MantineProvider>
    </Web3Provider>
  )
}
