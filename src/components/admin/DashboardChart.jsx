import React, { useState, useEffect, useRef } from "react";
import { LayoutDashboard, Users, UserCog, TrendingUp, Activity, Clock, Award, RefreshCw, ArrowUpRight, ArrowDownRight, Zap, Package, ShoppingCart, Eye, Edit2, Trash2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const AnimatedWrapper = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const visibilityClass = isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-500 ease-out ${visibilityClass}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const StatSkeleton = () => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse h-32">
        <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-gray-200"></div>
            <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-7 bg-gray-200 rounded w-1/2"></div>
        </div>
    </div>
);

const ActivitySkeleton = () => (
    <div className="flex items-center gap-3 p-3 rounded-lg animate-pulse">
        <div className="w-8 h-8 rounded-lg bg-gray-200"></div>
        <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
    </div>
);

const TableSkeleton = () => (
    <div className="space-y-3 animate-pulse">
        {Array(5).fill(0).map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        ))}
    </div>
);

const DashboardChart = () => {
    
    const totalUser = 1323;
    const totalProduct = 24;
    const productTerjual = 18;
    const productBelumTerjual = totalProduct - productTerjual;
    const totalTransaksi = 47;
    const [isLoading, setIsLoading] = useState(true);
    const [activePeriod, setActivePeriod] = useState("bulanan");
    const [currentTime, setCurrentTime] = useState(new Date());

    
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
            
            setTableData([
                {
                    id: 1,
                    name: "Kursus React Native",
                    category: "Programming",
                    price: "Rp 299.000",
                    status: "Active",
                    sales: 45,
                    rating: 4.8,
                    lastUpdate: "2 jam lalu"
                },
                {
                    id: 2,
                    name: "UI/UX Design Fundamentals",
                    category: "Design",
                    price: "Rp 199.000",
                    status: "Active",
                    sales: 32,
                    rating: 4.6,
                    lastUpdate: "5 jam lalu"
                },
                {
                    id: 3,
                    name: "Data Science Bootcamp",
                    category: "Data Science",
                    price: "Rp 499.000",
                    status: "Inactive",
                    sales: 18,
                    rating: 4.9,
                    lastUpdate: "1 hari lalu"
                },
                {
                    id: 4,
                    name: "Web Development Fullstack",
                    category: "Programming",
                    price: "Rp 399.000",
                    status: "Active",
                    sales: 67,
                    rating: 4.7,
                    lastUpdate: "3 jam lalu"
                },
                {
                    id: 5,
                    name: "Digital Marketing Mastery",
                    category: "Marketing",
                    price: "Rp 249.000",
                    status: "Active",
                    sales: 28,
                    rating: 4.5,
                    lastUpdate: "6 jam lalu"
                }
            ]);
        }, 1200);
        
        return () => {
            clearInterval(timer);
            clearTimeout(loadingTimer);
        };
    }, []);

    
    const stats = [
        {
            title: "Total Pengguna",
            value: totalUser,
            icon: <Users size={20} />,
            color: "blue",
            change: "+12%",
            changeType: "positive"
        },
        {
            title: "Total Produk",
            value: totalProduct,
            icon: <Package size={20} />,
            color: "violet",
            change: "+8%",
            changeType: "positive"
        },
        {
            title: "Produk Terjual",
            value: productTerjual,
            icon: <ShoppingCart size={20} />,
            color: "emerald",
            change: "+23%",
            changeType: "positive"
        },
        {
            title: "Belum Terjual",
            value: productBelumTerjual,
            icon: <Package size={20} />,
            color: "amber",
            change: "-5%",
            changeType: "negative"
        },
        {
            title: "Total Transaksi",
            value: totalTransaksi,
            icon: <TrendingUp size={20} />,
            color: "cyan",
            change: "+15%",
            changeType: "positive"
        },
    ];

    const recentActivity = [
        { action: "Pengguna baru terdaftar", name: "Ahmad Rizki", time: "5 menit lalu", type: "user" },
        { action: "Produk baru ditambahkan", name: "Kursus React Native", time: "1 jam lalu", type: "product" },
        { action: "Transaksi berhasil", name: "Paket Premium", time: "2 jam lalu", type: "transaction" },
        { action: "Review baru", name: "Kursus JavaScript", time: "3 jam lalu", type: "review" },
    ];

    
    const chartData = {
        mingguan: [
            { name: "Sen", value: 12 },
            { name: "Sel", value: 19 },
            { name: "Rab", value: 15 },
            { name: "Kam", value: 22 },
            { name: "Jum", value: 18 },
            { name: "Sab", value: 25 },
            { name: "Min", value: 20 },
        ],
        bulanan: [
            { name: "Jan", value: 12 },
            { name: "Feb", value: 19 },
            { name: "Mar", value: 15 },
            { name: "Apr", value: 22 },
            { name: "Mei", value: 18 },
            { name: "Jun", value: 25 },
            { name: "Jul", value: 20 },
            { name: "Agu", value: 28 },
            { name: "Sep", value: 22 },
            { name: "Okt", value: 30 },
            { name: "Nov", value: 25 },
            { name: "Des", value: 32 },
        ],
        tahunan: [
            { name: "2020", value: 450 },
            { name: "2021", value: 520 },
            { name: "2022", value: 680 },
            { name: "2023", value: 750 },
            { name: "2024", value: 856 },
        ]
    };

    const currentChartData = chartData[activePeriod];
    
    
    const pieChartData = [
        { name: 'Terjual', value: productTerjual },
        { name: 'Belum Terjual', value: productBelumTerjual },
    ];

    const COLORS = ['#10b981', '#f59e0b'];
    
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
                    <p className="text-sm text-blue-600 font-bold">
                        {payload[0].value} transaksi
                    </p>
                </div>
            );
        }
        return null;
    };

    
    const PieTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">
                        {payload[0].name}
                    </p>
                    <p className="text-sm text-gray-600">
                        {payload[0].value} produk
                    </p>
                </div>
            );
        }
        return null;
    };

    
    const colorClasses = {
        blue: {
            bg: 'bg-blue-50',
            icon: 'text-blue-600',
            badge: 'bg-green-50 text-green-700',
            text: 'text-blue-900'
        },
        violet: {
            bg: 'bg-violet-50',
            icon: 'text-violet-600',
            badge: 'bg-green-50 text-green-700',
            text: 'text-violet-900'
        },
        emerald: {
            bg: 'bg-emerald-50',
            icon: 'text-emerald-600',
            badge: 'bg-green-50 text-green-700',
            text: 'text-emerald-900'
        },
        amber: {
            bg: 'bg-amber-50',
            icon: 'text-amber-600',
            badge: 'bg-red-50 text-red-700',
            text: 'text-amber-900'
        },
        cyan: {
            bg: 'bg-cyan-50',
            icon: 'text-cyan-600',
            badge: 'bg-green-50 text-green-700',
            text: 'text-cyan-900'
        }
    };

    const actionColors = {
        blue: { bg: 'bg-blue-50', icon: 'text-blue-600', text: 'text-blue-900', border: 'border-blue-100' },
        violet: { bg: 'bg-violet-50', icon: 'text-violet-600', text: 'text-violet-900', border: 'border-violet-100' },
        emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', text: 'text-emerald-900', border: 'border-emerald-100' },
        cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', text: 'text-cyan-900', border: 'border-cyan-100' }
    };

    
    const formatTime = (date) => {
        return date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-transparent font-sans">
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8 pt-6">
                
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                                Dashboard Admin
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Selamat datang! Berikut ringkasan performa sistem.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-600">{formatDate(currentTime)}</p>
                            <p className="text-lg font-semibold text-gray-900">{formatTime(currentTime)}</p>
                        </div>
                    </div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {isLoading ? (
                        Array(5).fill(0).map((_, index) => <StatSkeleton key={index} />)
                    ) : (
                        stats.map((stat, index) => (
                            <AnimatedWrapper key={index} delay={index * 100}>
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 h-32 flex flex-col justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className={`p-2 rounded-lg ${colorClasses[stat.color].bg}`}>
                                            {React.cloneElement(stat.icon, { 
                                                className: colorClasses[stat.color].icon
                                            })}
                                        </div>
                                        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                                            stat.changeType === 'positive' 
                                                ? 'bg-green-50 text-green-700' 
                                                : 'bg-red-50 text-red-700'
                                            }`}>
                                            {stat.changeType === 'positive' ? (
                                                <ArrowUpRight className="w-3 h-3" />
                                            ) : (
                                                <ArrowDownRight className="w-3 h-3" />
                                            )}
                                            {stat.change}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {stat.value.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedWrapper>
                        ))
                    )}
                </div>

                {/* Chart Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Line Chart */}
                    <AnimatedWrapper delay={300} className="lg:col-span-2">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full min-h-[400px] flex flex-col">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-50">
                                        <TrendingUp className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Performa Penjualan</h2>
                                        <p className="text-sm text-gray-500">Trend penjualan periode</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                                    {["mingguan", "bulanan", "tahunan"].map((period) => (
                                        <button 
                                            key={period}
                                            onClick={() => setActivePeriod(period)}
                                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 capitalize ${
                                                activePeriod === period 
                                                    ? "bg-white text-blue-600 shadow-sm" 
                                                    : "text-gray-600 hover:text-gray-900"
                                                }`}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart 
                                        data={currentChartData} 
                                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                                        <XAxis 
                                            dataKey="name" 
                                            stroke="#6b7280"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis 
                                            stroke="#6b7280"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line 
                                            type="monotone" 
                                            dataKey="value" 
                                            stroke="#3b82f6" 
                                            strokeWidth={2}
                                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
                                            isAnimationActive={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </AnimatedWrapper>

                    {/* Pie Chart */}
                    <AnimatedWrapper delay={500}>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full min-h-[400px] flex flex-col">
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Status Produk</h2>
                                <p className="text-sm text-gray-500">Distribusi penjualan</p>
                            </div>
                            
                            <div className="flex-1 flex items-center justify-center mb-4 relative">
                                <div className="w-full h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieChartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={2}
                                                dataKey="value"
                                                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                                labelLine={false}
                                                isAnimationActive={false}
                                            >
                                                {pieChartData.map((entry, index) => (
                                                    <Cell 
                                                        key={`cell-${index}`} 
                                                        fill={COLORS[index]} 
                                                        stroke="#ffffff"
                                                        strokeWidth={2}
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<PieTooltip />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-900">{totalProduct}</p>
                                        <p className="text-xs text-gray-500">Total Produk</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-center gap-6 mb-4">
                                {pieChartData.map((entry, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div 
                                            className="w-3 h-3 rounded-full" 
                                            style={{ backgroundColor: COLORS[index] }}
                                        ></div>
                                        <span className="text-sm text-gray-600">{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                                    <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-600 mb-0.5">Terjual</p>
                                        <p className="text-lg font-bold text-green-700">{productTerjual}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                                    <div className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0"></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-600 mb-0.5">Belum Terjual</p>
                                        <p className="text-lg font-bold text-amber-700">{productBelumTerjual}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedWrapper>
                </div>
                
                {/* Bottom Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Actions */}
                    <AnimatedWrapper delay={700}>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-blue-50">
                                    <Zap className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Aksi Cepat</h2>
                                    <p className="text-sm text-gray-500">Akses fitur dengan cepat</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: <Users className="w-5 h-5" />, title: "Tambah User", desc: "User baru", color: "blue" },
                                    { icon: <UserCog className="w-5 h-5" />, title: "Kelola Staff", desc: "Manage team", color: "violet" },
                                    { icon: <Package className="w-5 h-5" />, title: "Tambah Produk", desc: "Produk baru", color: "emerald" },
                                    { icon: <TrendingUp className="w-5 h-5" />, title: "Lihat Laporan", desc: "Analytics", color: "cyan" },
                                ].map((action, index) => (
                                    <button 
                                        key={index}
                                        className={`p-4 ${actionColors[action.color].bg} rounded-lg hover:shadow-md transition-all duration-200 border ${actionColors[action.color].border} hover:scale-105 h-24 flex flex-col items-start justify-center`}
                                    >
                                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white mb-2 shadow-sm`}>
                                            {React.cloneElement(action.icon, { 
                                                className: actionColors[action.color].icon
                                            })}
                                        </div>
                                        <p className={`text-sm font-semibold ${actionColors[action.color].text} text-left`}>{action.title}</p>
                                        <p className={`text-xs ${actionColors[action.color].icon} text-left mt-0.5`}>{action.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </AnimatedWrapper>

                    {/* Recent Activity */}
                    <AnimatedWrapper delay={900}>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-gray-50">
                                        <Activity className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Aktivitas Terbaru</h2>
                                        <p className="text-sm text-gray-500">Update real-time sistem</p>
                                    </div>
                                </div>
                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Lihat Semua
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {isLoading ? (
                                    Array(4).fill(0).map((_, index) => <ActivitySkeleton key={index} />)
                                ) : (
                                    recentActivity.map((activity, index) => (
                                        <div 
                                            key={index} 
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                                        >
                                            <div className={`p-2 rounded-lg ${
                                                activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                                                activity.type === 'product' ? 'bg-emerald-100 text-emerald-600' :
                                                activity.type === 'transaction' ? 'bg-cyan-100 text-cyan-600' :
                                                'bg-amber-100 text-amber-600'
                                                }`}>
                                                {activity.type === 'user' ? <Users className="w-4 h-4" /> :
                                                 activity.type === 'product' ? <Package className="w-4 h-4" /> :
                                                 activity.type === 'transaction' ? <ShoppingCart className="w-4 h-4" /> :
                                                 <TrendingUp className="w-4 h-4" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                                                <p className="text-sm text-gray-600 truncate">{activity.name}</p>
                                            </div>
                                            <div className="text-xs text-gray-500 whitespace-nowrap">
                                                {activity.time}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </AnimatedWrapper>
                </div>

                {/* Table Section - Ditambahkan di bagian paling bawah */}
                <AnimatedWrapper delay={1100}>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Table Header */}
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Daftar Produk</h2>
                                    <p className="text-sm text-gray-600">Manajemen produk dan kursus</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-sm text-gray-600">
                                        Total: <span className="font-semibold">{tableData.length} produk</span>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                        Tambah Produk
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="overflow-x-auto">
                            {isLoading ? (
                                <div className="p-6">
                                    <TableSkeleton />
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Produk</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kategori</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Harga</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Penjualan</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Update</th>
                                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {tableData.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                                            <Package className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                                                {item.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-semibold text-gray-900">{item.price}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        item.status === 'Active' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                                        <span className="text-sm font-medium text-gray-900">{item.sales}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-sm font-medium text-gray-900">{item.rating}</span>
                                                        <span className="text-yellow-500">★</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600">{item.lastUpdate}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors group-hover:scale-110" title="Lihat">
                                                            <Eye size={16} />
                                                        </button>
                                                        <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors group-hover:scale-110" title="Edit">
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors group-hover:scale-110" title="Hapus">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Table Footer */}
                        {!isLoading && tableData.length > 0 && (
                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="text-sm text-gray-600">
                                        Menampilkan <span className="font-semibold">{tableData.length}</span> produk
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                            Sebelumnya
                                        </button>
                                        <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                            Selanjutnya
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </AnimatedWrapper>
            </div>
        </div>
    );
};

export default DashboardChart;