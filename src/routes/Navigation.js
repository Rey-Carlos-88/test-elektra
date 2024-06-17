import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import routes from './routes'
import logo from '../logo.svg';

export const Navigation = () => {
  return (
    <BrowserRouter>
        <div className='main-layout'>
            <nav>
              <img src={ logo } alt="React Logo" />
              <ul>
                {
                  routes.map( ( item ) => {
                    return (
                      <li key={ item.path } >
                          <NavLink 
                              to={ item.path }
                              activeClassName={ ({ isActive }) => isActive ? 'nav-active' : '' }
                          >
                            { item.title }
                          </NavLink>
                      </li>
                    )
                  })
                }
              </ul>
            </nav>

            <Routes>
                {
                    routes.map((item) => (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={<item.Component />}
                        />
                        
                    ))
                }
                <Route path='/*' element={ <Navigate to={routes[0].path} replace />} />
            </Routes>

        </div>
    </BrowserRouter>
  )
}