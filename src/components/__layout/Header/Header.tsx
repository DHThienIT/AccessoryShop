import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Popover } from 'antd'
import {
    SearchOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'

import { search } from '../../../services'
import UserMenu from '../../__combined/UserMenu'
import MiniCart from '../../__combined/MiniCart'
import Search from '../../__atom/Search'
import LinkItem from '../../__atom/LinkItem'

import logo from '../../../assets/img/global/logo_primary.png'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
const cl = classNames.bind(styles)

function Header() {
    const [searchVisible, setSearchVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const searchQuery = useQuery(
        ['search-products', searchValue],
        () => search(searchValue),
        {
            staleTime: 30000,
            cacheTime: 60000,
            refetchOnWindowFocus: false,
            enabled: searchValue.length > 0,
        }
    )

    const handleSearch = () => {}
    return (
        <div className={cl('wrapper')}>
            <div className={cl('inner')}>
                <div className={`grid wide ${cl('top-wrapper')}`}>
                    <div className={cl('top')}>
                        <Link to='/'>
                            <img src={logo} alt='' className={cl('logo')} />
                        </Link>
                        <div className={cl('funcs')}>
                            <div
                                onClick={() => setSearchVisible(true)}
                                className={cl('func')}
                            >
                                <SearchOutlined className={cl('icon')} />
                            </div>
                            <div className={cl('func')}>
                                <Popover
                                    trigger={'click'}
                                    content={<MiniCart />}
                                    title={null}
                                    placement='bottomRight'
                                >
                                    <ShoppingCartOutlined
                                        className={cl('icon')}
                                    />
                                </Popover>
                            </div>
                            <div className={cl('func')}>
                                <Popover
                                    trigger={'click'}
                                    content={<UserMenu />}
                                    title={null}
                                    placement='bottomRight'
                                >
                                    <UserOutlined className={cl('icon')} />
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cl('bottom-wrapper')}>
                    <div className={`grid wide h-full`}>
                        <div className={cl('bottom')}>
                            <div className={cl('nav-item')}>
                                <NavLink
                                    to='/'
                                    className={(state) =>
                                        cl({
                                            active: state.isActive,
                                        })
                                    }
                                >
                                    HOME
                                </NavLink>

                                <div className={cl('nav-item-extend')}>
                                    <LinkItem to='/cart' title='Cart' />
                                    <LinkItem to='/contact' title='Contact' />
                                    <LinkItem to='/about' title='About us' />
                                </div>
                            </div>
                            <div className={cl('nav-item')}>
                                <NavLink
                                    to='/shop'
                                    className={(state) =>
                                        cl({
                                            active: state.isActive,
                                        })
                                    }
                                >
                                    SHOP
                                </NavLink>

                                <div className={cl('nav-item-extend')}>
                                    <LinkItem to='/product' title='List' />
                                </div>
                            </div>
                            <div className={cl('nav-item')}>
                                <NavLink
                                    to='/shop'
                                    className={(state) =>
                                        cl({
                                            active: state.isActive,
                                        })
                                    }
                                >
                                    CONTACT
                                </NavLink>

                                <div className={cl('nav-item-extend')}>
                                    content
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Search
                    products={searchQuery?.data || []}
                    value={searchValue}
                    onChange={setSearchValue}
                    onClose={() => setSearchVisible(false)}
                    onSearch={() => {}}
                    visible={searchVisible}
                    className={cl('search')}
                />
            </div>
        </div>
    )
}

export default Header
