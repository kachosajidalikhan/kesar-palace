import React, { useEffect, useState } from 'react'
import { Card, CardBody, Container, Row, Col, } from 'reactstrap';
import './Summary.css'
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Summary = () => {
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);
    const [totalRooms, setTotalRooms] = useState(0);
    const [revenueData, setRevenueData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const bookingsResponse = await axios.get('/bookingdetails');
          const roomsResponse = await axios.get('/get-room');
  
          setBookings(bookingsResponse.data);
          setRooms(roomsResponse.data);
  
          calculateTotalRevenue(bookingsResponse.data);
          setTotalBookings(bookingsResponse.data.length);
          setTotalRooms(roomsResponse.data.length);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const calculateTotalRevenue = (bookings) => {
      const revenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
      setTotalRevenue(revenue);
  
      // Create revenue data for chart
      const revenueData = bookings.map(booking => ({
        date: new Date(booking.createdAt).toDateString(),
        totalPrice: booking.totalPrice
      }));
  
      setRevenueData(revenueData);
    };
  
    const revenueChartData = {
        labels: revenueData.map(data => data.date),
        datasets: [
          {
            label: 'Total Revenue',
            data: revenueData.map(data => data.totalPrice),
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      };


    
    const reports = [
        { title: "Total Rooms", iconClass: "cube-outline", total: totalRooms, badgecolor: "info" },
        { title: "Total Revenue", iconClass: "buffer", total: 'Rs.' + totalRevenue, badgecolor: "danger" },
        { title: "Total Bookings", iconClass: "briefcase-check", total: totalBookings, badgecolor: "info" },
    ]


    return (
        <>
<div className='dashboard-text'>
                <h4>
                    Welcome to the Dashboard
                </h4>
             
            </div>

            <Container fluid className="p-3">
                <Row className='summary-row'>
                    {reports.map((report, key) => (
                        <Col xl={3} sm={6} key={key}>
                            <Card className="mini-stat bg-primary">
                                <CardBody className="card-body mini-stat-img">
                                    <div className="mini-stat-icon">
                                        <i className={"float-end mdi mdi-" + report.iconClass}></i>
                                    </div>
                                    <div className="text-white">
                                        <h6 className="text-uppercase mb-3 font-size-16 text-white">{report.title}</h6>
                                        <h2 className="mb-4 text-white">{report.total}</h2>
                                        <span className="ms-2">From Previous Records</span>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
          
            </Container>
            <div style={{margin:'auto'}} className="col-xl-8 col-sm-12">
            <div className="chart-container">
            <h2>Revenue Chart</h2>
              <Line data={revenueChartData} />
            </div>
          </div>
          <br/>
          <br/>
         
        </>
    )
}

export default Summary;