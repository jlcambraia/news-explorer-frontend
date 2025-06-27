import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { CurrentPathContext } from './contexts/CurrentPathContext';
import { SearchArticlesContext } from './contexts/SearchArticlesContext.js';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';
import { RegistrationStatusContext } from './contexts/RegistrationStatusContext.js';

import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import SavedNews from './pages/SavedNews/SavedNews';
import Footer from './components/Footer/Footer';
import Popup from './components/modals/Popup';
import Login from './components/modals/Login';
import Register from './components/modals/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import WarningPopup from './components/modals/WarningPopup.jsx';

import { useAuth } from './hooks/useAuth';
import { useNews } from './hooks/useNews';
import { useSavedArticles } from './hooks/useSavedArticles';
import { usePopup } from './hooks/usePopup';
import { useNavigation } from './hooks/useNavigation';
import { POPUP_MESSAGES } from './constants/popupMessages';
import { useEffect } from 'react';

function App() {
	const navigate = useNavigate();

	const auth = useAuth();
	const news = useNews();
	const savedArticles = useSavedArticles(auth.isUserLoggedIn);
	const popupManager = usePopup();
	const navigation = useNavigation();

	const handleLoginWithUX = async (email, password) => {
		const result = await auth.handleLogin(email, password);

		if (result.success) {
			navigation.closeMobileMenu();
			popupManager.handleClosePopup();
		} else {
			popupManager.handleOpenPopup(POPUP_MESSAGES.FAILED_LOGIN);
		}
	};

	const handleRegistrationWithUX = async (email, password, name) => {
		const result = await auth.handleRegistration(email, password, name);

		if (result.success) {
			popupManager.handleClosePopup();
			popupManager.handleOpenPopup(POPUP_MESSAGES.SUCCESSFUL_REGISTRATION);
		}
	};

	const handleLogoutWithUX = () => {
		auth.handleLogout();
		navigation.closeMobileMenu();
		navigate('/');
	};

	const handleSearchWithUX = async (inputValue) => {
		const result = await news.searchNewsFromApi(inputValue);

		if (result.error === 'KEYWORD_REQUIRED') {
			popupManager.handleOpenPopup(POPUP_MESSAGES.KEYWORD_ERROR);
		}
	};

	const handleSaveArticleWithUX = async (article) => {
		const result = await savedArticles.handleSaveArticle(article);

		if (result.error === 'SAVE_ERROR') {
			popupManager.handleOpenPopup(POPUP_MESSAGES.SAVE_ARTICLES_ERROR);
		}
	};

	const handleRemoveArticleWithUX = async (articleId) => {
		const result = await savedArticles.handleRemoveArticle(articleId);

		if (result.success) {
			popupManager.handleClosePopup();
		} else {
			popupManager.handleOpenPopup(POPUP_MESSAGES.REMOVE_ARTICLES_ERROR);
		}
	};

	const registerPopup = {
		title: 'Inscrever-se',
		children: <Register handleRegistration={handleRegistrationWithUX} />,
	};

	const loginPopup = {
		title: 'Entrar',
		children: <Login handleLogin={handleLoginWithUX} />,
	};

	const warningPopup = {
		title: 'Aviso sobre desempenho da API',
		children: <WarningPopup />,
	};

	useEffect(() => {
		popupManager.handleOpenPopup(warningPopup);
	}, []);

	return (
		<SearchArticlesContext.Provider
			value={{
				...news,
				savedArticles: savedArticles.savedArticles,
				searchNewsFromApi: handleSearchWithUX,
			}}
		>
			<CurrentUserContext.Provider
				value={{
					isUserLoggedIn: auth.isUserLoggedIn,
					currentUserInfo: auth.currentUserInfo,
					handleOpenPopup: popupManager.handleOpenPopup,
					loginPopup,
					token: auth.token,
				}}
			>
				<CurrentPathContext.Provider value={navigation.atHomepage}>
					<RegistrationStatusContext.Provider value={auth.registrationFailed}>
						<div
							className={
								navigation.atHomepage
									? 'app__body'
									: 'app__body app__body_without-background-image'
							}
						>
							<Header
								openPopup={popupManager.handleOpenPopup}
								loginPopup={loginPopup}
								handleLogout={handleLogoutWithUX}
								isMobileMenuOpen={navigation.isMobileMenuOpen}
								setIsMobileMenuOpen={navigation.setIsMobileMenuOpen}
							/>
							<Routes>
								<Route
									path='/'
									element={<Main handleSaveArticle={handleSaveArticleWithUX} />}
								/>
								<Route
									path='/saved-news'
									element={
										<ProtectedRoute>
											<SavedNews
												handleOpenPopup={popupManager.handleOpenPopup}
												handleRemoveArticle={handleRemoveArticleWithUX}
											/>
										</ProtectedRoute>
									}
								/>
								<Route path='*' element={<Navigate to='/' />} />
							</Routes>
							<Footer />

							{popupManager.popup && (
								<Popup
									openPopup={popupManager.handleOpenPopup}
									closePopup={popupManager.handleClosePopup}
									title={popupManager.popup.title}
									registerPopup={registerPopup}
									loginPopup={loginPopup}
								>
									{popupManager.popup.children}
								</Popup>
							)}
						</div>
					</RegistrationStatusContext.Provider>
				</CurrentPathContext.Provider>
			</CurrentUserContext.Provider>
		</SearchArticlesContext.Provider>
	);
}

export default App;
