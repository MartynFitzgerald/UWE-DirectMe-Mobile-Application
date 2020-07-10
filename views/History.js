import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { List, Appbar, Text, Divider } from 'react-native-paper';

export default class History extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { route } = this.props;
    const { styles, colors } = this.props.route;
    return (
      <View>
       <Appbar.Header style={styles.desire}>
            <Appbar.Content title={route.tabTitle} style={[styles.appBarTitle, colors.desire]} titleStyle={[styles.appBarTitle, styles.whiteText]}/>
        </Appbar.Header>
        <ScrollView contentContainerStyle={[styles.scrollView, styles.white]}>
          <List.Section style={styles.list}>
            <List.Subheader style={styles.lightGreyText}>17th September 2019</List.Subheader>
            <List.Item
              titleStyle={styles.lightGreyText}
              title="Trenchard Street Car Park"
              descriptionStyle={styles.lightGreyText}
              description="4 Hour Stay"
              left={() => <List.Icon color={colors.lightGrey} icon="history" />}
              right={() => <Text style={styles.paid}>PAID</Text>}
          />
            <List.Item
              titleStyle={styles.lightGreyText}
              title="NCP Car Park Bristol Broadmead"
              descriptionStyle={styles.lightGreyText}
              description="30 Minutes Stay"
              left={() => <List.Icon color={colors.lightGrey} icon="history" />}
              right={() => <Text style={styles.unpaid}>UNPAID</Text>}
          />
          <Divider style={styles.lightGrey}/>
          <List.Subheader style={styles.lightGreyText}>10th September 2019</List.Subheader>
          <List.Item
            titleStyle={styles.lightGreyText}
            title="Millennium Square Car Park"
            descriptionStyle={styles.lightGreyText}
            description="7 Hour Stay"
            left={() => <List.Icon color={colors.lightGrey} icon="history" />}
            right={() => <Text style={styles.paid}>PAID</Text>}
            />
            <List.Item
              titleStyle={styles.lightGreyText}
              title="Rupert Street Car Park"
              descriptionStyle={styles.lightGreyText}
              description="10 Minutes Stay"
              left={() => <List.Icon color={colors.lightGrey} icon="history" />}
              right={() => <Text style={styles.paid}>PAID</Text>}
            />
            <Divider style={styles.lightGrey}/>
            <List.Subheader style={styles.lightGreyText}>10th September 2019</List.Subheader>
            <List.Item
              titleStyle={styles.lightGreyText}
              title="Millennium Square Car Park"
              descriptionStyle={styles.lightGreyText}
              description="7 Hour Stay"
              left={() => <List.Icon color={colors.lightGrey} icon="history" />}
              right={() => <Text style={styles.paid}>PAID</Text>}
            />
            <List.Item
              titleStyle={styles.lightGreyText}
              title="Rupert Street Car Park"
              descriptionStyle={styles.lightGreyText}
              description="10 Minutes Stay"
              left={() => <List.Icon color={colors.lightGrey} icon="history" />}
              right={() => <Text style={styles.paid}>PAID</Text>}
            />
            <Divider style={styles.lightGrey}/>
            <List.Subheader style={styles.lightGreyText}>10th September 2019</List.Subheader>
            <List.Item
              titleStyle={styles.lightGreyText}
              title="Millennium Square Car Park"
              descriptionStyle={styles.lightGreyText}
              description="7 Hour Stay"
              left={() => <List.Icon color={colors.lightGrey} icon="history" />}
              right={() => <Text style={styles.paid}>PAID</Text>}
              />
              <List.Item
                titleStyle={styles.lightGreyText}
                title="Rupert Street Car Park"
                descriptionStyle={styles.lightGreyText}
                description="10 Minutes Stay"
                left={() => <List.Icon color={colors.lightGrey} icon="history" />}
                right={() => <Text style={styles.paid}>PAID</Text>}
              />
              <Divider style={styles.lightGrey}/>
              <List.Subheader style={styles.lightGreyText}>10th September 2019</List.Subheader>
              <List.Item
                titleStyle={styles.lightGreyText}
                title="Millennium Square Car Park"
                descriptionStyle={styles.lightGreyText}
                description="7 Hour Stay"
                left={() => <List.Icon color={colors.lightGrey} icon="history" />}
                right={() => <Text style={styles.paid}>PAID</Text>}
                />
                <List.Item
                  titleStyle={styles.lightGreyText}
                  title="Rupert Street Car Park"
                  descriptionStyle={styles.lightGreyText}
                  description="10 Minutes Stay"
                  left={() => <List.Icon color={colors.lightGrey} icon="history" />}
                  right={() => <Text style={styles.paid}>PAID</Text>}
                />
        </List.Section>
        </ScrollView>
      </View>
    );
  }
}