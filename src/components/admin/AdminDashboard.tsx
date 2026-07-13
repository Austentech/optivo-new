'use client';

import { useState, useEffect } from 'react';
import { Users, Mail, Phone, MessageSquare, ArrowRight, Loader2, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

interface Stats {
  totalLeads: number;
  newLeads: number;
  callbackLeads: number;
  enquiryLeads: number;
  readRate: number;
  callbackShare: number;
  enquiryShare: number;
  recentLeads: {
    id: string;
    name: string;
    phone: string;
    email: string;
    service: string;
    type: string;
    isRead: boolean;
    createdAt: string;
  }[];
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'TOTAL LEADS',
      value: stats?.totalLeads ?? 0,
      icon: Users,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-500',
    },
    {
      label: 'NEW (UNREAD) LEADS',
      value: stats?.newLeads ?? 0,
      icon: Mail,
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-500',
    },
    {
      label: 'CALLBACK REQUESTS',
      value: stats?.callbackLeads ?? 0,
      icon: Phone,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-500',
    },
    {
      label: 'ENQUIRY LEADS',
      value: stats?.enquiryLeads ?? 0,
      icon: MessageSquare,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-500',
    },
  ];

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={28} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${card.lightColor}`}
              >
                <card.icon size={20} className={card.textColor} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {card.label}
                </p>
                <p className="mt-0.5 text-2xl font-bold text-gray-900">
                  {card.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
          <button
            onClick={() => onNavigate('admin-new-leads')}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 transition hover:text-blue-600"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {(!stats?.recentLeads || stats.recentLeads.length === 0) ? (
            <div className="px-6 py-12 text-center text-sm text-gray-400">
              No leads yet. They will appear here once submitted.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {stats.recentLeads.map((lead) => (
                <li
                  key={lead.id}
                  className="flex items-center justify-between gap-4 px-5 py-3.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {lead.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {lead.service && `${lead.service} • `}
                      {lead.phone}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge
                      className={`text-xs font-semibold ${
                        lead.type === 'callback'
                          ? 'border-transparent bg-green-100 text-green-700'
                          : 'border-transparent bg-purple-100 text-purple-700'
                      }`}
                    >
                      {lead.type === 'callback' ? 'CALLBACK' : 'ENQUIRY'}
                    </Badge>
                    <span className="hidden text-xs text-gray-400 sm:inline">
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Lead Statistics */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Lead Statistics</h2>
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Read Rate</span>
                <span className="font-semibold text-gray-900">{stats?.readRate ?? 0}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-blue-100">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${stats?.readRate ?? 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Callback Share</span>
                <span className="font-semibold text-gray-900">
                  {stats?.callbackShare ?? 0}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-green-100">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{ width: `${stats?.callbackShare ?? 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">Enquiry Share</span>
                <span className="font-semibold text-gray-900">
                  {stats?.enquiryShare ?? 0}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-purple-100">
                <div
                  className="h-full rounded-full bg-purple-500 transition-all duration-500"
                  style={{ width: `${stats?.enquiryShare ?? 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tip box */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
        <Lightbulb size={18} className="mt-0.5 shrink-0 text-blue-500" />
        <p className="text-sm text-blue-800">
          <span className="font-semibold">TIP</span> — Mark leads as read after follow-up to keep your New Leads queue clean.
        </p>
      </div>
    </div>
  );
}