import React from "react";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token";
import infoTooltip from "./InfoTooltip";



const App = () => {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [isTooltipPopupOpen, setTooltipPopup] = React.useState(false);
    const [InfoTooltip, setOnInfoTooltip] = React.useState({});
    const [isLogin, setIsLogin] = React.useState(false);
    const [data, setData] = React.useState({
        email: "",
        password: "",
    });

    const history = useHistory();


    React.useEffect(() => {
        tokenCheck();
    }, []);

    React.useEffect(() => {
        if (isLogin) {
            Promise.all([api.getProfile(), api.getInitialCards()]).then(([data, cardList]) => {
                setCurrentUser(data)
                setCards(cardList.reverse())
            })
                .catch((err) => console.log(`Ошибка: ${err}`));
        }
    }, [isLogin])

    const signOut = () => {
        removeToken();
        setData({
            email: "",
            password: "",
        });
        setIsLogin(false);
        history.push("/sign-in");
    };

    const handleRegister = (email, password) => {
        auth.register(email, password)
            .then(() => {
                setTooltipPopup(true);
                setOnInfoTooltip(true);
                history.push("/sign-in");
            })
            .catch((res) => {
                console.log(res);
                setTooltipPopup(true);
                setOnInfoTooltip(false);
            });
    };

    const handleLogin = (email, password) => {
        auth.authorize(email, password)
            .then((data) => {
                setToken(data.token);
                setData({
                    email: data.email,
                });
                setIsLogin(true);
                history.replace({ pathname: "/" });
            })
            .catch((res) => {
                console.log(res);
                setTooltipPopup(true);
                setOnInfoTooltip(false);
            });
    };

    const tokenCheck = () => {
        const jwt = getToken();
        if (jwt) {
            auth.getContent(jwt)
                .then((res) => {
                    if (res && res.email) {
                        setData({
                            email: res.email,
                        });
                        setIsLogin(true);
                        history.push("/");
                    } else {
                        history.push("/sign-in");
                    }
                })
                .catch((err) => console.error(err));
        }
    };


    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard({});
        setTooltipPopup(false);
    }


    const handleUpdateUser = (name, about) => {
        api.editProfile(name, about)
            .then(({ name, about }) => {
                setCurrentUser((prevUserState) => {
                    return { ...prevUserState, name, about };
                });

                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка ${err}`)
            );
    };

    const handleUpdateAvatar = (avatar) => {
        api.editAvatar( avatar )
            .then(({ avatar }) => {
                setCurrentUser((prevUserState) => {
                    return { ...prevUserState, avatar };
                });
                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка ${err}`)
            );
    };


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        const changeLikeCardStatus = !isLiked
            ? api.addLike(card._id)
            : api.deleteLike(card._id);
        changeLikeCardStatus
            .then((newCard) => {
                setCards((item) =>
                    item.map((c) => (c._id === card._id ? newCard.card : c))
                );
            })
            .catch((err) => console.log(`Ошибка ${err}`));
    };


    const handleAddPlaceSubmit = (name, link) => {
        api.addCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) =>
                console.log(`Ошибка ${err}`)
            );
    };

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(`Ошибка ${err}`));
    };

return (
  <div className="root">
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        signOut={signOut}
          loggedIn={isLogin}
          email={data.email}
      />

      <Switch>
        <ProtectedRoute
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          component={Main}
          loggedIn={isLogin}
          exact
          path="/"
        />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route>
            {isLogin ? (
                <Redirect to="/" />
            ) : (
                <Redirect to="/sign-in" />
            )}
          </Route>
      </Switch>

      {isLogin && <Footer />}

      <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          imgInfo={infoTooltip.img}
          textInfo={infoTooltip.text}
      />

      <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
  </CurrentUserContext.Provider>
  </div>
);
};
export default App;