import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { List, Appbar, Text, Divider } from 'react-native-paper';

//Import styles.
import { styles } from '../styles/General';

export default class History extends Component {
  render() {
    return (
      <View>
        <Appbar.Header style={styles.appBar}>
            <Appbar.Content title={this.props.route.tabTitle} style={styles.appBarTitle} titleStyle={styles.appBarTitle}/>
        </Appbar.Header>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <List.Section style={styles.list}>
            <List.Subheader>17th September 2019</List.Subheader>
            <List.Item
              title="Trenchard Street Car Park"
              description="4 Hour Stay"
              left={() => <List.Icon icon="history" />}
              right={() => <Text style={styles.paid}>PAID</Text>}
              //right={() => <Button height={25} style={styles.statusBox, styles.paid} disabled={true} mode="contained">PAID</Button>}
          />
            <List.Item
              title="NCP Car Park Bristol Broadmead"
              description="30 Minutes Stay"
              left={() => <List.Icon color="#000" icon="history" />}
              right={() => <Text style={styles.unpaid}>UNPAID</Text>}
              //right={() => <Button height={25} style={styles.unpaid} disabled={true} mode="contained">UNPAID</Button>}
          />
          <Divider/>
          <List.Subheader>10th September 2019</List.Subheader>
          <List.Item
            title="Millennium Square Car Park"
            description="7 Hour Stay"
            left={() => <List.Icon icon="history" />}
            right={() => <Text style={styles.paid}>PAID</Text>}
            //right={() => <Button height={25} style={styles.statusBox, styles.paid} disabled={true} mode="contained">PAID</Button>}
            />
            <List.Item
              title="Rupert Street Car Park"
              description="10 Minutes Stay"
              left={() => <List.Icon color="#000" icon="history" />}
              right={() => <Text style={styles.paid}>PAID</Text>}
              //right={() => <Button height={25} style={styles.unpaid} disabled={true} mode="contained">UNPAID</Button>}
            />
            <Divider/>
            <List.Subheader>10th September 2019</List.Subheader>
            <List.Item
              title="Millennium Square Car Park"
              description="7 Hour Stay"
              left={() => <List.Icon icon="history" />}
              right={() => <Text style={styles.paid}>PAID</Text>}
              //right={() => <Button height={25} style={styles.statusBox, styles.paid} disabled={true} mode="contained">PAID</Button>}
            />
            <List.Item
              title="Rupert Street Car Park"
              description="10 Minutes Stay"
              left={() => <List.Icon color="#000" icon="history" />}
              right={() => <Text style={styles.paid}>PAID</Text>}
              //right={() => <Button height={25} style={styles.unpaid} disabled={true} mode="contained">UNPAID</Button>}
            />
            <Divider/>
            <List.Subheader>10th September 2019</List.Subheader>
            <List.Item
              title="Millennium Square Car Park"
              description="7 Hour Stay"
              left={() => <List.Icon icon="history" />}
              right={() => <Text style={styles.paid}>PAID</Text>}
              //right={() => <Button height={25} style={styles.statusBox, styles.paid} disabled={true} mode="contained">PAID</Button>}
              />
              <List.Item
                title="Rupert Street Car Park"
                description="10 Minutes Stay"
                left={() => <List.Icon color="#000" icon="history" />}
                right={() => <Text style={styles.paid}>PAID</Text>}
                //right={() => <Button height={25} style={styles.unpaid} disabled={true} mode="contained">UNPAID</Button>}
              />
              <Divider/>
              <List.Subheader>10th September 2019</List.Subheader>
              <List.Item
                title="Millennium Square Car Park"
                description="7 Hour Stay"
                left={() => <List.Icon icon="history" />}
                right={() => <Text style={styles.paid}>PAID</Text>}
                //right={() => <Button height={25} style={styles.statusBox, styles.paid} disabled={true} mode="contained">PAID</Button>}
                />
                <List.Item
                  title="Rupert Street Car Park"
                  description="10 Minutes Stay"
                  left={() => <List.Icon color="#000" icon="history" />}
                  right={() => <Text style={styles.paid}>PAID</Text>}
                  //right={() => <Button height={25} style={styles.unpaid} disabled={true} mode="contained">UNPAID</Button>}
                />
        </List.Section>
        </ScrollView>
      </View>
    );
  }
}