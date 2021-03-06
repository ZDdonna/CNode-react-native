/**
 * React Native App
 * https://github.com/ztplz/CNode-react-native
 * email: mysticzt@gmail.com
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomRow from '../../components/CustomRow';
import { pixel } from '../../utils/deviceSize';
import * as actions from '../../actions/userdetailActions';
import LoadingPage from '../../components/LoadingPage';
import timeDiff from '../../utils/timeDiffUtil';
import {
  NIGHT_HEADER_COLOR,
  NIGHT_BACKGROUND_COLOR,
  NIGHT_CUSTOMROW_TEXT_COLOR,
  NIGHT_CUSTOMROW_BACKGROUND_COLOR
} from '../../constants/themecolor';
import NetErrorPage from '../../components/NetErrorPage';

class UserDetail extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.authorname + ' 的详情',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: screenProps.isNightMode? NIGHT_HEADER_COLOR : screenProps.themeColor
    },
  });

  componentDidMount() {
    this.props.actions.getUserDetailData({isLoading: true, isLoaded: false, username: this.props.navigation.state.params.authorname, timeout: 10000, error: ''});
  }

  render() {
    const { screenProps, isLoading, isLoaded, error, data, navigation } = this.props;
    if(isLoading) {
      return(
        <LoadingPage
          title='正在加载中...'
          screenProps={screenProps}
        />
      )
    }

    if(!isLoading && isLoaded) {
      return (
        <ScrollView style={[styles.container, { backgroundColor: screenProps.isNightMode? NIGHT_BACKGROUND_COLOR : null }]}>
          <View style={[styles.userInfoContainer, { backgroundColor: screenProps.isNightMode? NIGHT_CUSTOMROW_BACKGROUND_COLOR : null }]}>
            <Image source={{uri: data.avatar_url}} style={styles.avatar}/>
            <View style={styles.userInfo}>
              <Text style={[styles.username, { color: screenProps.isNightMode? NIGHT_CUSTOMROW_TEXT_COLOR : null }]}>{data.loginname}</Text>
              <Text style={styles.createTime}>注册时间：{timeDiff(data.create_at)}</Text>
            </View>
          </View>
          <View style={styles.replyAndPostContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('RecentReply', {authorname: navigation.state.params.authorname})}
            >
              <CustomRow
                leftIcon={<Icon name='ios-chatboxes' size={30} color='#635bed' />}
                rightIcon={<Icon name='ios-arrow-forward' size={20} color='#9d9eab' />}
                title='最近参与话题'
                titleStyle={{ color: screenProps.isNightMode? NIGHT_CUSTOMROW_TEXT_COLOR : null }}
                rowStyle={[styles.replyRow, { backgroundColor: screenProps.isNightMode? NIGHT_CUSTOMROW_BACKGROUND_COLOR : null }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('RecentTopics', {authorname: navigation.state.params.authorname})}
            >
              <CustomRow
                leftIcon={<Icon name='ios-brush' size={30} color='#e71fc7' />}
                rightIcon={<Icon name='ios-arrow-forward' size={20} color='#9d9eab' />}
                title='最近创建话题'
                titleStyle={{ color: screenProps.isNightMode? NIGHT_CUSTOMROW_TEXT_COLOR : null }}
                rowStyle={[styles.postRow, { backgroundColor: screenProps.isNightMode? NIGHT_CUSTOMROW_BACKGROUND_COLOR : null }]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.collectionContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('Collection', {authorname: navigation.state.params.authorname})}
            >
              <CustomRow
                leftIcon={<Icon name='ios-star' size={30} color='#e2525b' />}
                rightIcon={<Icon name='ios-arrow-forward' size={20} color='#9d9eab' />}
                title='他/她的收藏'
                titleStyle={{ color: screenProps.isNightMode? NIGHT_CUSTOMROW_TEXT_COLOR : null }}
                rowStyle={[styles.collectionRow, { backgroundColor: screenProps.isNightMode? NIGHT_CUSTOMROW_BACKGROUND_COLOR : null }]}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )
    }

    if(error !== '') {
      return (
        <NetErrorPage
          error={error.message}
          handler={() => actions.getUserDetailData({isLoading: true, isLoaded: false, username: this.props.navigation.state.params.authorname, timeout: 10000, error: ''})}
        />
      )
    }

    return null;
  }
}

 const styles = StyleSheet.create({
   Container: {
     flex: 1,
   },
   userInfoContainer: {
     flexDirection: 'row',
     paddingLeft: 8,
     paddingRight: 8,
     paddingTop: 7,
     paddingBottom: 7,
     backgroundColor: '#ffffff',
     marginTop: 20,
   },
   avatar: {
     height: 45,
     width: 45,
     borderRadius: 5,
     borderWidth: 1,
     borderColor: '#b2b0b6'
   },
   userInfo: {
     marginLeft: 10,
     justifyContent: 'space-between',
   },
   username: {
     fontSize: 18,
   },
   createTime: {
     fontSize: 12,
     color: '#727e7a'
   },
   replyAndPostContainer: {
     marginTop: 20,
   },
   replyRow: {
     borderBottomWidth: pixel,
     borderTopWidth: pixel,
     paddingTop: 5,
     paddingBottom: 5,
     borderColor: '#b2b0b6',
     backgroundColor: '#ffffff'
   },
   postRow: {
     borderBottomWidth: pixel,
     borderTopWidth: pixel,
     paddingTop: 5,
     paddingBottom: 5,
     borderColor: '#b2b0b6',
     backgroundColor: '#ffffff'
   },
   collectionContainer: {
     marginTop: 20,
   },
   collectionRow: {
     borderBottomWidth: pixel,
     borderTopWidth: pixel,
     paddingTop: 5,
     paddingBottom: 5,
     borderColor: '#b2b0b6',
     backgroundColor: '#ffffff'
   },
   draftboxContainer: {
     marginTop: 20
   },
   draftboxRow: {
     borderBottomWidth: pixel,
     borderTopWidth: pixel,
     paddingTop: 5,
     paddingBottom: 5,
     borderColor: '#b2b0b6',
     backgroundColor: '#ffffff'
   },
   settingContainer: {
     marginTop: 40
   },
   settingRow: {
     borderBottomWidth: pixel,
     borderTopWidth: pixel,
     paddingTop: 5,
     paddingBottom: 5,
     borderColor: '#b2b0b6',
     backgroundColor: '#ffffff'
   },
   cleanContainer: {
     marginTop: 20,
   },
   cleanRow: {
     borderBottomWidth: pixel,
     borderTopWidth: pixel,
     paddingTop: 5,
     paddingBottom: 5,
     borderColor: '#b2b0b6',
     backgroundColor: '#ffffff'
   },
   aboutContainer: {
     marginTop: 45,
   },
   aboutRow: {
     borderBottomWidth: pixel,
     borderTopWidth: pixel,
     paddingTop: 5,
     paddingBottom: 5,
     borderColor: '#b2b0b6',
     backgroundColor: '#ffffff'
   }
 });

const mapStateToProps = state => {
  const stateOfUserDetail = state.UserDetailState.toJS();
  return {
    isLoading: stateOfUserDetail.isLoading,
    isLoaded: stateOfUserDetail.isLoaded,
    error: stateOfUserDetail.error,
    data: stateOfUserDetail.data,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

 export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
