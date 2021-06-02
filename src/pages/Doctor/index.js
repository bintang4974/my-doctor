import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DoctorCategory, Gap, HomeProfile, NewsItem, RatedDoctor } from '../../components';
import { colors, fonts, getData, showError } from '../../utils';
import { DummyDoctor1, DummyDoctor2, DummyDoctor3, JSONCategoryDoctor } from '../../assets';
import { Fire } from '../../config';

const Doctor = ({ navigation }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        Fire.database()
            .ref('news/')
            .once('value')
            .then((res) => {
                console.log('data: ', res.val());
                if (res.val()) {
                    setNews(res.val());
                }
            }).catch((err) => {
                showError(err.message);
            });
    }, []);

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.wrapperSection}>
                        <Gap height={30} />
                        <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
                        <Text style={styles.welcome}>Mau konsultasi dengan siapa hari ini?</Text>
                    </View>
                    <View style={styles.wrapperScroll}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.category}>
                                <Gap width={32} />
                                {
                                    JSONCategoryDoctor.data.map(item => {
                                        return <DoctorCategory
                                            key={item.id}
                                            category={item.category}
                                            onPress={() => navigation.navigate('ChooseDoctor')} />
                                    })
                                }
                                <Gap width={22} />
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.wrapperSection}>
                        <Text style={styles.sectionLabel}>Top Rated Doctor</Text>
                        <RatedDoctor
                            name="Abidin Raihan"
                            desc="Prediatrician"
                            avatar={DummyDoctor1}
                            onPress={() => navigation.navigate('DoctorProfile')}
                        />
                        <RatedDoctor
                            name="Fathan A.K"
                            desc="Dentist"
                            avatar={DummyDoctor2}
                            onPress={() => navigation.navigate('DoctorProfile')}
                        />
                        <RatedDoctor
                            name="Cator Hendra"
                            desc="Podiatrist"
                            avatar={DummyDoctor3}
                            onPress={() => navigation.navigate('DoctorProfile')}
                        />
                        <Text style={styles.sectionLabel}>Good News</Text>
                    </View>
                    {news.map((item) => {
                        return (
                            <NewsItem
                                key={item.id}
                                title={item.title}
                                date={item.date}
                                image={item.image}
                            />
                        )
                    })}
                    <Gap height={30} />
                </ScrollView>
            </View>
        </View>
    )
}

export default Doctor

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.secondary,
        flex: 1
    },
    content: {
        backgroundColor: colors.white,
        flex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    wrapperSection: {
        paddingHorizontal: 16
    },
    welcome: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16,
        maxWidth: 209
    },
    category: {
        flexDirection: 'row',
    },
    wrapperScroll: {
        marginHorizontal: -16
    },
    sectionLabel: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16
    }
})
