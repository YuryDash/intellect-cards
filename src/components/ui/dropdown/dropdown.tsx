import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Avatar } from '@/components/ui/avatar'
import { DropdownWithAvatar } from '@/components/ui/dropdown/dropdown-avatar'
import { DropdownItem, DropdownItemWithIcon } from '@/components/ui/dropdown/dropdown-item'
import { EditIcon, LogOutIcon, PlayIcon, ProfileAvatarIcon } from '@/icons'
import { MoreOptionsIcon } from '@/icons/icon-components/more-options-icon'
import { useLogoutMutation } from '@/services/auth/auth.service'
import { AuthResponse } from '@/services/auth/auth.types'
import { useDeleteDecksMutation } from '@/services/decks/decks.service'
import { setModal } from '@/services/decks/decks.slice'
import { ResponseGetDeckById } from '@/services/decks/decks.types'
import { Arrow, Content, Root, Trigger } from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropdown.module.scss'

export type DropdownProps = {
  align?: 'center' | 'end' | 'start'
  item?: ResponseGetDeckById
  story?: boolean
  userData?: AuthResponse
} & ComponentPropsWithoutRef<typeof Root>

export const Dropdown = forwardRef<ElementRef<typeof Content>, DropdownProps>(
  ({ item, story = false, userData }, ref) => {
    const classNames = {
      arrow: clsx(s.arrow),
      content: clsx(s.content),
      separator: clsx(s.separator),
      trigger: clsx(s.trigger),
    }

    const [open, setOpen] = useState(false)
    const [logout] = useLogoutMutation()
    const [navigateToLogin, setNavigateToLogin] = useState(false)
    const navigate = useNavigate()
    const userAvatar = userData?.avatar
      ? userData.avatar
      : 'https://ionicframework.com/docs/img/demos/avatar.svg'
    const dispatch = useDispatch()
    const [deleteDecks, {}] = useDeleteDecksMutation()

    const onClickLogOut = async () => {
      try {
        if (!story) {
          await logout().unwrap()
          setNavigateToLogin(true)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }

    if (navigateToLogin) {
      return <Navigate to={'/login'} />
    }
    const onConfirmDeleteCallback = async (id: string, name: string) => {
      try {
        await deleteDecks(id).unwrap()
        dispatch(setModal({ modalID: null, variant: null }))
        toast.success(`deck: ${name} delete was successful`)
      } catch (e) {
        toast.error(`some error try again latter: ${e}`)
      }
    }

    return (
      <Root defaultOpen onOpenChange={setOpen} open={open}>
        <Trigger asChild>
          {userData ? (
            <span>
              <Avatar image={userAvatar} />
            </span>
          ) : (
            <div className={s.moreOptionsItem}>
              <MoreOptionsIcon />
            </div>
          )}
        </Trigger>
        {open && (
          <Content className={classNames.content} ref={ref}>
            <>
              {userData?.name ? (
                <>
                  <DropdownItem>
                    <DropdownWithAvatar
                      avatar={userAvatar ?? `https://ionicframework.com/docs/img/demos/avatar.svg`}
                      mail={userData.email}
                      name={userData.name}
                      onClick={() => {
                        navigate('/')
                      }}
                    />
                  </DropdownItem>
                  <DropdownItemWithIcon
                    icon={<ProfileAvatarIcon />}
                    label={'My Profile'}
                    onClick={() => {
                      navigate('/user-profile')
                    }}
                  />
                  <DropdownItemWithIcon
                    icon={<LogOutIcon />}
                    label={'Sign Out'}
                    onClick={onClickLogOut}
                  />
                </>
              ) : (
                <>
                  <DropdownItemWithIcon
                    icon={<PlayIcon />}
                    label={'Learn'}
                    onClick={() => alert('play')}
                  />
                  <DropdownItemWithIcon
                    icon={<EditIcon />}
                    label={'Edit'}
                    onClick={() => alert('Edit')}
                  />
                  {/*<DropdownItemWithIcon*/}
                  {/*  icon={<DeleteIcon />}*/}
                  {/*  label={'Delete'}*/}
                  {/*  onClick={() => {*/}
                  {/*    dispatch(setModal({ modalID: item?.id, variant: 'deleteInModal' }))*/}
                  {/*  }}*/}
                  {/*/>*/}
                </>
              )}
              <Arrow className={classNames.arrow} />
            </>
          </Content>
        )}
      </Root>
    )
  }
)
