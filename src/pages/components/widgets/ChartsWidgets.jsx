import React from 'react'
import { Head, Block, Card } from '../../../componenets'
import ActiveUsersCard from '../../dashboard/Analytics/ActiveUsersCard';
import OrdersOverviewCard from '../../dashboard/Crypto/OrdersOverviewCard';
import UserActivitiesCard from '../../dashboard/Crypto/UserActivitiesCard';
import SalesOverviewCard from '../../dashboard/Sales/SalesOverviewCard';
import AudienceOverviewCard from '../../dashboard/Analytics/AudienceOverviewCard';
import TrafficChannelCard from '../../dashboard/Analytics/TrafficChannelCard';
import TrafficChannelListCard from '../../dashboard/Analytics/TrafficChannelListCard';
import SessionsCard from '../../dashboard/Analytics/SessionsCard';



const ChartWidgetsPage = () => {
  return (
    <>
        <Head title="Chart Widgets" />
        <div className="lg:max-w-[960px] mx-auto">
            <Block.PageHead className="md:max-w-[720px]">
                <Block.Back to="/components">Components</Block.Back>
                <Block.TitleLg>Chart Widgets</Block.TitleLg>
            </Block.PageHead>

            <Block>
                <Block.Head>
                    <Block.Title>Single Bar Chart</Block.Title>
                    <Block.Text>A bar chart provides a way of showing data values represented as vertical bars.</Block.Text>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className=" rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 md:col-span-6">
                                    <ActiveUsersCard/>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>Multiple Bar Chart</Block.Title>
                    <Block.Text>A bar chart provides a way of showing data values represented as vertical bars.</Block.Text>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className=" rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12">
                                    <OrdersOverviewCard/>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>Stacked Bar Chart</Block.Title>
                    <Block.Text>A bar chart provides a way of comparison of multiple data with stacked view.</Block.Text>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className=" rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 md:col-span-6">
                                    <UserActivitiesCard/>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>Solid Line Chart</Block.Title>
                    <Block.Text>A line chart is a way of plotting data points on a line.</Block.Text>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className=" rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12">
                                    <SalesOverviewCard/>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>Solid Line Chart</Block.Title>
                    <Block.Text>A line chart is a way of plotting data points on a line.</Block.Text>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className=" rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12">
                                    <AudienceOverviewCard/>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>Multiple Line Chart</Block.Title>
                    <Block.Text>A line chart is a way of plotting data points on a line.</Block.Text>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className=" rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12">
                                    <TrafficChannelListCard/>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>Donught Charts</Block.Title>
                    <Block.Text>Dughnut charts are probably the most commonly used charts. It use to show relational proportions between data.</Block.Text>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className=" rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 md:col-span-6">
                                    <TrafficChannelCard/>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>Donught Charts with icons</Block.Title>
                    <Block.Text>Dughnut charts are probably the most commonly used charts. It use to show relational proportions between data.</Block.Text>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className=" rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 md:col-span-6">
                                    <SessionsCard/>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

        </div>
    </>
  )
}

export default ChartWidgetsPage