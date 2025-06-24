import React from 'react'
import { Card, Icon } from '../../../componenets'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const BotPerformanceCard = ({ className }) => {
  // Sample chatbot data
  const chatMetrics = {
    totalChats: 1247,
    totalDuration: "18h 32m",
    avgDuration: "8m 54s",
    avgTokensPerChat: 156,
    totalTokens: 194632,
    feedback: {
      positive: 847,
      negative: 123,
      noFeedback: 277
    }
  };

  // Feedback chart data
  const feedbackData = {
    labels: ['Positive', 'Negative', 'No Feedback'],
    datasets: [
      {
        data: [
          chatMetrics.feedback.positive,
          chatMetrics.feedback.negative,
          chatMetrics.feedback.noFeedback
        ],
        backgroundColor: [
          '#16a34a', // green-600
          '#dc2626', // red-600
          '#64748b', // slate-500
        ],
        borderColor: [
          '#16a34a',
          '#dc2626',
          '#64748b',
        ],
        borderWidth: 0,
      },
    ],
  };

  const feedbackOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true,
          font: {
            size: 11,
          },
          color: '#64748b',
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const label = context.label;
            const value = context.parsed;
            const percentage = ((value / chatMetrics.totalChats) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Card className={`${className ? className : ''}`}>
      <Card.Header>
        <Card.Title className="text-base font-bold text-slate-800 dark:text-slate-200">
          Bot Performance
        </Card.Title>
        <div className="text-xs text-slate-500">
          Chatbot analytics and metrics
        </div>
      </Card.Header>
      <Card.Body className="pt-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Icon name="message-square" className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-xs text-slate-500">Total Chats</span>
            </div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {chatMetrics.totalChats.toLocaleString()}
            </div>
          </div>

          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Icon name="clock" className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-xs text-slate-500">Total Duration</span>
            </div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {chatMetrics.totalDuration}
            </div>
          </div>

          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Icon name="bar-chart" className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-xs text-slate-500">Avg Duration</span>
            </div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {chatMetrics.avgDuration}
            </div>
          </div>

          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Icon name="hash" className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-xs text-slate-500">Avg Tokens</span>
            </div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {chatMetrics.avgTokensPerChat}
            </div>
          </div>
        </div>

        {/* Token Metrics */}
        <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
            Token Usage
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-red-600">Total Tokens:</span>
            <span className="font-semibold text-red-800 dark:text-red-200">
              {chatMetrics.totalTokens.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Feedback Chart */}
        <div>
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            User Feedback
          </div>
          <div className="h-32">
            <Doughnut data={feedbackData} options={feedbackOptions} />
          </div>
        </div>

        {/* Feedback Summary */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="font-semibold text-green-600">
              {((chatMetrics.feedback.positive / chatMetrics.totalChats) * 100).toFixed(1)}%
            </div>
            <div className="text-slate-500">Positive</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-red-600">
              {((chatMetrics.feedback.negative / chatMetrics.totalChats) * 100).toFixed(1)}%
            </div>
            <div className="text-slate-500">Negative</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-slate-500">
              {((chatMetrics.feedback.noFeedback / chatMetrics.totalChats) * 100).toFixed(1)}%
            </div>
            <div className="text-slate-500">No Feedback</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default BotPerformanceCard
