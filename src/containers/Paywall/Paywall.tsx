import { Button, Text } from 'components';
import { useSession } from 'providers/session/SessionProvider';
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, Linking, Pressable, SafeAreaView, TouchableOpacity, View } from 'react-native';
import Purchases, { PACKAGE_TYPE, PurchasesOfferings, PurchasesPackage } from 'react-native-purchases';
// import { Button, Text } from 'ui/components/common';
import useStyles from './style';

interface PurchaseItem {
  title: string;
  price: string;
  id: string;
  description: string;
  category: string;
  type: PACKAGE_TYPE;
}

// const dummyPurchases = [
//   {
//     price: '12.99',
//     title: 'The Full Path',
//     id: 1,
//     description: 'A part of your life!',
//     category: '1 year',
//     type: 'a',
//   },
//   {
//     price: '9.99',
//     title: 'Deep dive',
//     id: 2,
//     description: 'Stay supported',
//     category: '6 month',
//     type: 'e',
//   },
//   {
//     price: '10.99',
//     title: 'Dip In',
//     id: 1,
//     description: 'It takes 30 days to build a new habit. Try it!',
//     category: '1 month',
//     type: 'i',
//   },
// ];
export const Paywall: React.VFC = () => {
  const styles = useStyles();
  const ref = useRef<PurchasesOfferings>();
  const session = useSession();
  const [purchases, setPurchases] = useState<PurchaseItem[]>();
  // const [purchases, setPurchases] = useState<PurchaseItem[]>(dummyPurchases);
  useEffect(() => {
    setUpPurchases();
  }, []);

  const setUpPurchases = async () => {
    const offerings = await Purchases.getOfferings();
    console.debug(offerings);
    ref.current = offerings;
    if (offerings.current !== null) {
      const purchaseOffering = offerings.current;
      console.log('purchaseOffering..annual', purchaseOffering.annual);
      // setPurchases(offerings.current);
      // setup the annual, six-months, and monthly subscription array
      const annual = {
        price: purchaseOffering.annual?.product.priceString,
        title: purchaseOffering.annual?.product.title.replace('(Seeking Safety)', ''),
        id: purchaseOffering.annual?.product.identifier,
        description: purchaseOffering.annual?.product.description,
        category: '1 year',
        type: purchaseOffering.annual?.packageType,
      };
      const sixMonth = {
        price: purchaseOffering.sixMonth?.product.priceString,
        title: purchaseOffering.sixMonth?.product.title.replace('(Seeking Safety)', ''),
        id: purchaseOffering.sixMonth?.product.identifier,
        description: purchaseOffering.sixMonth?.product.description,
        category: '6 months',
        type: purchaseOffering.sixMonth?.packageType,
      };
      const monthly = {
        price: purchaseOffering.monthly?.product.priceString,
        title: purchaseOffering.monthly?.product.title.replace('(Seeking Safety)', ''),
        id: purchaseOffering.monthly?.product.identifier,
        description: purchaseOffering.monthly?.product.description,
        category: '1 month',
        type: purchaseOffering.monthly?.packageType,
      };
      const paywallData = [];

      if (purchaseOffering.monthly) {
        paywallData.push(monthly);
      }
      if (purchaseOffering.sixMonth) {
        paywallData.push(sixMonth);
      }
      if (purchaseOffering.annual) {
        paywallData.push(annual);
      }
      console.debug(paywallData);
      setPurchases(paywallData as PurchaseItem[]);
      // Display current offering with offerings.current
    } else {
      throw Error('invalid current offers');
    }
  };

  const selectItem = async (item: PurchaseItem) => {
    // purchase item
    console.debug('buying', item);
    try {
      // find selected purchase
      let selectedPackage: PurchasesPackage | null = null;
      if (ref.current?.current?.annual?.packageType === item.type) {
        selectedPackage = ref.current?.current?.annual;
      } else if (ref.current?.current?.sixMonth?.packageType === item.type) {
        selectedPackage = ref.current?.current?.sixMonth;
      } else if (ref.current?.current?.monthly?.packageType === item.type) {
        selectedPackage = ref.current?.current?.monthly;
      }
      if (selectedPackage === null) {
        throw Error('invalid selected package null');
      }
      console.debug('buying item,', selectedPackage);
      const { customerInfo: purchaserInfo, productIdentifier } = await Purchases.purchasePackage(
        selectedPackage as PurchasesPackage
      );
      console.debug('bought!', purchaserInfo, productIdentifier);
      if (purchaserInfo.entitlements.active.paid?.isActive) {
        console.debug('ok!');
        session.setUserSubscribed();
      } else {
        console.warn('no active entitlement', purchaserInfo);
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.error(e);
        throw Error('purchase error');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <ImageBackground source={require('./assets/paywallBackground.png')} style={styles.headerImg} />
          <View style={styles.welcome}>
            <Text size={18}>We're glad you tried </Text>
            <Text weight={'600'} size={18}>
              Seeking safety!
            </Text>
          </View>
          {/* Page Content  */}
          <View style={styles.payOptions}>
            <View style={styles.space} />
            <Text>
              We hope you enjoyed the 3-day free trial. If you'd like to continue using the app, please choose an option
              below:
            </Text>
            <View style={styles.purchases} />
            <Text>Many roads, one journey</Text>
            <View style={styles.purchases} />
            {purchases && purchases.length > 0 && (
              <View style={{ display: 'flex' }}>
                {purchases.map((item, i) => (
                  <View style={styles.paymentItem} key={`pi-${i}`}>
                    <TouchableOpacity onPress={() => selectItem(item)} style={styles.paymentChild}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                        }}>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <Text bold style={styles.itemCategory}>
                          {item.category}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={styles.footer}>
          <Text>
            <Pressable
              onPress={() => Linking.openURL('https://www.treatment-innovations.org/ss-app-terms-of-use-policy.html')}>
              <Text bold style={styles.terms}>
                Terms of use
              </Text>
            </Pressable>
            <Pressable>
              <Text bold style={styles.terms}>
                {' '}
                and{' '}
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                Linking.openURL('https://www.treatment-innovations.org/ss-app-privacy-and-data-policy.html')
              }>
              <Text bold style={styles.terms}>
                Privacy Policy
              </Text>
            </Pressable>
          </Text>
        </View>
        <View style={styles.logoutContainer}>
          <Button style={styles.logoutBtn} textStyle={{ fontSize: 12 }} onPress={() => session.logout()}>
            LOG OUT
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
