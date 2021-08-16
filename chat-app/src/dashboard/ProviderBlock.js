import React, { useState } from 'react';
import { auth } from '../misc/firebase';
import { Tag, Icon, Button, Alert } from 'rsuite';
import firebase from 'firebase/app';

const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setIsConnected(p => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`you can not disconnect from ${providerId}`);
      }
      await auth.currentUser.unlink(providerId);
      updateIsConnected(providerId, false);
      Alert.info(`Disconnected from ${providerId}`, 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const unLinkFacebook = () => {
    unlink('facebook.com');
  };
  const unLinkGoogle = () => {
    unlink('google.com');
  };

  const link = async provider => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      Alert.info(`Linked to ${provider.providerId}`, 4000);
      updateIsConnected(provider.providerId, true);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
    //new firebase.auth.FacebookAuthProvider()
  };

  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      {isConnected['google.com'] && (
        <Tag color="green" closable onClose={unLinkGoogle}>
          <Icon icon="google" /> Connected
        </Tag>
      )}
      {isConnected['facebook.com'] && (
        <Tag color="blue" closable onClose={unLinkFacebook}>
          <Icon icon="facebook" /> Connected
        </Tag>
      )}
      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button block color="green" onClick={linkGoogle}>
            <Icon icon="google" />
            Link to Google
          </Button>
        )}

        {!isConnected['facebook.com'] && (
          <Button block color="blue" onClick={linkFacebook}>
            <Icon icon="facebook" />
            Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
