'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Download,
  FileText,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AdminLeadsTableProps {
  title: string;
  subtitle?: string;
  type: 'callback' | 'enquiry' | 'all';
  showNewOnly?: boolean;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  type: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminLeadsTable({
  title,
  subtitle,
  type,
  showNewOnly = false,
}: AdminLeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState(showNewOnly ? 'unread' : 'all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const limit = 20;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(limit));
      if (search) params.set('search', search);
      if (typeFilter !== 'all') params.set('type', typeFilter);
      else if (type !== 'all') params.set('type', type);
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [page, search, typeFilter, statusFilter, type]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleMarkRead = async (id: string) => {
    setActionLoading(id);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_read' }),
      });
      fetchLeads();
    } catch {
      // silent
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    setActionLoading(id);
    try {
      await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      fetchLeads();
    } catch {
      // silent
    } finally {
      setActionLoading(null);
    }
  };

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      const params = new URLSearchParams();
      params.set('format', format);
      if (typeFilter !== 'all') params.set('type', typeFilter);
      else if (type !== 'all') params.set('type', type);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/export?${params.toString()}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-export.${format}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // silent
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLeads();
  };

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

  const isAllType = type === 'all';
  const isCallbackType = type === 'callback';
  const isEnquiryType = type === 'enquiry';

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>

      {/* Toolbar */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="relative max-w-sm flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name, phone or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value === '') {
                setPage(1);
                // Will auto-fetch via useEffect
              }
            }}
            className="h-9 w-full rounded-lg border border-gray-300 bg-white py-1 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </form>

        <div className="flex items-center gap-2">
          {isAllType && (
            <Select
              value={typeFilter}
              onValueChange={(v) => {
                setTypeFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-9 w-[130px] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="callback">Callback</SelectItem>
                <SelectItem value="enquiry">Enquiry</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 w-[120px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('csv')}
            className="h-9 gap-1.5"
          >
            <Download size={14} />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('pdf')}
            className="h-9 gap-1.5"
          >
            <FileText size={14} />
            PDF
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <Loader2 size={24} className="animate-spin text-blue-500" />
          </div>
        ) : leads.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-gray-400">
            No leads found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  {isEnquiryType && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Service
                  </th>
                  {(isCallbackType || isAllType) && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Preferred Date
                    </th>
                  )}
                  {(isCallbackType || isAllType) && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Preferred Time
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Message
                  </th>
                  {isAllType && (
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Lead Type
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="transition hover:bg-gray-50/60">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {lead.name}
                    </td>
                    {isEnquiryType && (
                      <td className="px-4 py-3 text-gray-600">{lead.email || '—'}</td>
                    )}
                    <td className="px-4 py-3 text-gray-600">{lead.phone}</td>
                    <td className="max-w-[140px] truncate px-4 py-3 text-gray-600">
                      {lead.service || '—'}
                    </td>
                    {(isCallbackType || isAllType) && (
                      <td className="px-4 py-3 text-gray-600">
                        {lead.preferredDate || '—'}
                      </td>
                    )}
                    {(isCallbackType || isAllType) && (
                      <td className="px-4 py-3 text-gray-600">
                        {lead.preferredTime || '—'}
                      </td>
                    )}
                    <td className="max-w-[180px] truncate px-4 py-3 text-gray-500">
                      {lead.message || '—'}
                    </td>
                    {isAllType && (
                      <td className="px-4 py-3">
                        <Badge
                          className={`border-transparent text-xs font-semibold ${
                            lead.type === 'callback'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {lead.type === 'callback' ? 'CALLBACK' : 'ENQUIRY'}
                        </Badge>
                      </td>
                    )}
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      {lead.isRead ? (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                          <Eye size={12} className="mr-1" />
                          Read
                        </Badge>
                      ) : (
                        <button
                          onClick={() => handleMarkRead(lead.id)}
                          disabled={actionLoading === lead.id}
                          className="inline-flex items-center gap-1 rounded-lg bg-blue-500 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-blue-600 disabled:opacity-50"
                        >
                          {actionLoading === lead.id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Eye size={12} />
                          )}
                          Mark as Read
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        disabled={actionLoading === lead.id}
                        className="inline-flex items-center gap-1 text-xs font-medium text-red-500 transition hover:text-red-600 disabled:opacity-50"
                      >
                        {actionLoading === lead.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && leads.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm text-gray-500">
            <span>
              {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total} records
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-lg p-1.5 transition hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 text-xs font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded-lg p-1.5 transition hover:bg-gray-100 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}