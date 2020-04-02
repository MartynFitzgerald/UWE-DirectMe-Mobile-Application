import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, Title, Text, Divider } from 'react-native-paper';

export default class History extends Component {
  render() {
    return (
      <View>
        <Title style={styles.title}>History</Title>
        <ScrollView>
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

const styles = StyleSheet.create({
  list: {
      width: '100%',
      height: '100%',
  },
  title: {
      paddingTop: 40,
      marginTop: 0,
      marginBottom: 0,
      top: 0,
      textAlign: 'center', 
      fontWeight: 'bold',
      backgroundColor: '#EB3349',
      color: '#fff',
  },
  paid: {
    textAlignVertical: 'center',
    textAlign: 'center', 
    paddingHorizontal: 10,
    borderRadius:10,
    maxHeight:30, 
    top:12.5,
    backgroundColor: '#2FD63C',
    fontWeight: 'bold',
  },
  unpaid: {
    textAlignVertical: 'center',
    textAlign: 'center', 
    paddingHorizontal: 10,
    borderRadius:10,
    maxHeight:30, 
    top:12.5,
    backgroundColor: '#E71212',
    fontWeight: 'bold',
  },
});  
