import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput } from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order(){

    const route = useRoute<OrderRouteProps>();
    return(
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                <TouchableOpacity>
                    <Feather name="trash-2" size={28} color="#FF3F4B" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.input}>
               <Text style={{ color: '#FFF'}}>Pizza</Text> 
            </TouchableOpacity>

            <TouchableOpacity style={styles.input}>
               <Text style={{ color: '#FFF'}}>Pizza de calabresa</Text> 
            </TouchableOpacity>

            <View style={ styles.qtdContainer }>
                <Text style={ styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center'}]}
                    placeholder='1'
                    placeholderTextColor="#f0f0f0"
                    keyboardType='numeric'
                    value="1"
                />    
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header:{
        flexDirection: 'row',
        matginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    title:{
        fontSize:30,
        fontWight: 'bold',
        color: '#FFF',
        marginRight: 14
    },
    input:{
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#fff',
        fontSize: 20,

    },
    qtdContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }

});